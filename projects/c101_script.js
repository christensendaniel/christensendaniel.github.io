// Version 2024-06-19
// Store a var called capi_enabled in the SpmScript object to enable or disable capi
// Store a var called capi_url in the SpmScript object to set the capi webhook URL
// Don't forget to set CORS to allow the external posts
var capi_enabled = true;
var capi_url = 'https://fbcapi-webapp.azurewebsites.net/webhooks/capi';
var Debugging = {
    debug_mode: false,
    debugLog: function (message) {
        if (this.debug_mode) {
            console.log(message);
        }
    },
    checkDataLayer: function () {
        if (typeof window.dataLayer !== 'undefined') {
            this.debugLog("Data Layer is defined.");
        } else {
            this.debugLog("Data Layer is undefined.");
        }
    },
    logAll: function () {
        const siteInfo = spmSiteInfo.getAllSiteInfo();
        if (this.debug_mode) {
            this.debugLog("Site Information Cached:");
            this.debugLog(siteInfo);
        }
    }
};

var spmSiteInfo = {
    capi_enabled: (typeof capi_enabled !== 'undefined') ? capi_enabled : true,
    dedupeID: null,
    cache: null,
    uniqueId: Date.now() + '_' + Math.floor(Math.random() * 1000000).toString(),
    logURLParameters: function () {
        const params = new URLSearchParams(window.location.search);
        let urlParams = {};
        params.forEach((value, key) => {
            urlParams[key] = value;
        });
        return urlParams;
    },
    logCookies: function () {
        const cookies = document.cookie.split(';');
        let cookieObj = {};
        cookies.forEach((cookie) => {
            const parts = cookie.split('=');
            cookieObj[parts[0].trim()] = (parts[1] || '').trim();
        });
        return cookieObj;
    },
    logUserAgent: function () {
        return navigator.userAgent || "User agent not available";
    },
    getAllSiteInfo: function () {
        if (!this.cache) {
            const urlParameters = this.logURLParameters();
            const cookies = this.logCookies();
            const userAgent = this.logUserAgent();

            this.cache = {
                uniqueId: this.uniqueId,
                urlParameters: urlParameters,
                cookies: cookies,
                userAgent: userAgent,
            };
        }
        return this.cache;
    },
    saveAllSiteInfo: async function () {
        if (!this.capi_enabled) {
            Debugging.debugLog('capi function is disabled.');
            return;
        }

        const siteInfo = this.getAllSiteInfo();
        const dataLayerContent = window.dataLayer || {};

        const webhookUrl = capi_url;
        const data = {
            message: 'getAllSiteInfo',
            siteInfo: siteInfo,
            dataLayerContent: dataLayerContent
        };

        const controller = new AbortController();
        const signal = controller.signal;

        // Set a timeout to abort the request after 10 seconds
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 10000);

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: signal
            });

            clearTimeout(timeoutId); // Clear the timeout if the request completes in time

            const result = await response.text();
            if (result) {
                Debugging.debugLog('Webhook POST result: ' + result);
            } else {
                Debugging.debugLog('No response was given.');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                Debugging.debugLog('Request timed out after 10 seconds.');
            } else {
                Debugging.debugLog('Error sending webhook: ' + error);
            }
        }
    }


};


var SpmScript = {
    capi_enabled: (typeof capi_enabled !== 'undefined') ? capi_enabled : true,
    sha256: function (input) {
        if (input === '') {
            return Promise.resolve('');
        }
        var buffer = new TextEncoder().encode(input);
        return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
            return Array.from(new Uint8Array(hash), function (byte) {
                return ('0' + (byte & 0xFF).toString(16)).slice(-2);
            }).join('');
        });
    },
    createCompositeId: function (email) {
        const emailLower = email.toLowerCase();
        const now = new Date();
        const datePart = now.toISOString().substring(0, 10);
        const compositeString = emailLower + "-" + datePart;

        return this.sha256(compositeString).then(hash => {
            const uuidLikeHash = [
                hash.substring(0, 8),
                hash.substring(8, 12),
                '4' + hash.substring(13, 16),
                '8' + hash.substring(17, 20),
                hash.substring(20, 32)
            ].join('-');
            return uuidLikeHash;
        });
    },
    capi: async function () {
        if (!this.capi_enabled) {
            Debugging.debugLog('capi function is disabled.');
            return;
        }

        const dedupeID = String(spmSiteInfo.dedupeID);
        const uniqueId = String(spmSiteInfo.uniqueId);

        const webhookUrl = capi_url;
        let json_data;
        try {
            const data = {
                message: 'getAllSiteInfo',
                dedupeID: dedupeID,
                uniqueId: uniqueId
            };
            json_data = JSON.stringify(data);
            Debugging.debugLog('JSON data prepared for sending: ' + json_data);
        } catch (error) {
            Debugging.debugLog('Error converting data to JSON: ' + error);
            return;
        }

        // Creating a new promise to handle XMLHTTPRequest asynchronously
        const xhrPromise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", webhookUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            // Set up a timeout for the request
            xhr.timeout = 1000; // Timeout in ms

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(new Error('HTTP error! status: ' + this.status));
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network error occurred'));
            };
            xhr.ontimeout = function () {
                reject(new Error('Request timed out'));
            };

            // Send the request
            xhr.send(json_data);
        });

        try {
            Debugging.debugLog('Sending CAPI POST request using XMLHTTPRequest...');
            const result = await xhrPromise;
            Debugging.debugLog('Webhook POST result: ' + (result || 'No response was given.'));
        } catch (error) {
            Debugging.debugLog('Error sending webhook: ' + error.message);
        }
    },


    logFormEvent: async function (event_name, allInputs, piiFields = ['email', 'address', 'city', 'name', 'phone', 'zip', 'state']) {
        Debugging.debugLog("Processing inputs...");
        if (allInputs.length === 0) {
            Debugging.debugLog("No inputs provided.");
            return;
        }
        var dataLayerContent = {
            'event': event_name,
        };
        Debugging.debugLog("Total number of inputs provided: " + allInputs.length);

        let firstEmailValue = "";
        for (let input of allInputs) {
            let name = input.getAttribute('name') || 'unnamedInput';
            let value = input.value.trim().toLowerCase();

            let isPiiField = piiFields.some(piiKey => name.includes(piiKey));

            if (value !== '') {
                if (!firstEmailValue && name.includes('email') && value) {
                    firstEmailValue = value;
                }
                if (isPiiField) {
                    value = await this.sha256(value);
                    Debugging.debugLog("Hashed value for field " + name + ": " + value);
                }
                dataLayerContent[name] = value;
            } else {
                Debugging.debugLog("Empty value for field: " + name);
            }
        }
        if (firstEmailValue) {
            let dedupeID = await this.createCompositeId(firstEmailValue);
            if (dedupeID) {
                dataLayerContent['dedupeID'] = dedupeID;
                spmSiteInfo.dedupeID = dedupeID;
                Debugging.debugLog("Composite ID: " + dedupeID);
            }
        }
        var productInfo = this.logProductInfo();
        if (productInfo && productInfo.productNames.length > 0) {
            dataLayerContent['productInfo'] = productInfo;
        }
        try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(dataLayerContent);
            await this.capi();
            Debugging.debugLog("Data layer updated with page inputs data.");
        } catch (error) {
            Debugging.debugLog("Error updating data layer: " + error);
        }
    },
    logProductInfo: function (dedupe = true) {
        var selectedRadio = document.querySelector('input[type="radio"]:checked');
        var checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        var productsSet = new Set();
        var totalProductAmount = 0;
        var productNames = [];

        function processProduct(productElement) {
            if (productElement && productElement.dataset.productName && productElement.dataset.productAmount) {
                var productName = productElement.dataset.productName;
                var productAmount = parseFloat(productElement.dataset.productAmount);
                var productKey = productName + '_' + productAmount;

                if (!dedupe || !productsSet.has(productKey)) {
                    productsSet.add(productKey);
                    productNames.push(productName);
                    totalProductAmount += productAmount;
                    Debugging.debugLog("Processed product: " + JSON.stringify({ productName, productAmount }));
                }
            } else {
                Debugging.debugLog("Invalid product info or product is null");
            }
        }

        if (selectedRadio) {
            processProduct(selectedRadio);
        }

        checkedCheckboxes.forEach(checkbox => processProduct(checkbox));

        Debugging.debugLog("Aggregating product info");
        var productInfo = {
            productNames: productNames,
            totalProductAmount: totalProductAmount
        };

        return productInfo;
    }

};

function queryMultipleSelectors(selectors) {
    var results = [];
    selectors.forEach(function (selector) {
        var foundElements = document.querySelectorAll(selector);
        Debugging.debugLog("Selector '" + selector + "' found " + foundElements.length + " elements.");

        if (foundElements.length > 0) {
            results = results.concat(Array.prototype.slice.call(foundElements));
        }
    });
    if (results.length === 0) {
        Debugging.debugLog("SPM Script Deactivated: No buttons found. Please ensure the button exists and add its selector to the selectors list.");
    }
    return results;
}

Debugging.debugLog("Debugging is enabled.");
Debugging.logAll();

let allInputs = document.querySelectorAll('input');
Debugging.debugLog("Total inputs found on the page: " + allInputs.length);

spmSiteInfo.saveAllSiteInfo();

// Event name to be used for the form submission
let eventName = "emailSubmitted";

var selectors = ["[href='#submit-form']", "[href='#submit-form-2step-order']"];
var foundElements = queryMultipleSelectors(selectors);

foundElements.forEach(function (button) {
    button.addEventListener("click", async function (event) {
        Debugging.debugLog("Button Pressed");
        event.preventDefault();

        await SpmScript.logFormEvent.call(SpmScript, eventName, allInputs);
    });
});
