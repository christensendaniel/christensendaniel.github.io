// Polyfill TextEncoder/TextDecoder for jsdom (required by react-router-dom v7+)
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = global.TextEncoder || TextEncoder
global.TextDecoder = global.TextDecoder || TextDecoder
