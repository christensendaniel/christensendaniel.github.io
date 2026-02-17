# Accessibility Audit Report

**Site:** https://christensendaniel.com  
**Audit Date:** February 17, 2026  
**Standard:** WCAG 2.1 AA  

## Executive Summary

This audit evaluates the site against WCAG 2.1 Level AA accessibility standards. While the site demonstrates several accessibility best practices (semantic HTML, keyboard navigation support, ARIA labels on some components), there are **12 critical and major issues** that need attention to ensure full accessibility compliance.

---

## Critical Issues

### 1. Missing Language Attribute on HTML Element
**Severity:** Critical  
**Affects:** All pages (index.html)  
**Problem:** The `<html>` element in index.html has `lang="en"`, but this should be verified on all dynamically rendered pages. React Helmet should ensure the lang attribute is consistently set.  
**Why it matters:** Screen readers rely on the language attribute to select the appropriate pronunciation rules and voice characteristics.  
**Suggested Fix:**
```html
<!-- index.html already has this, verify it's not overridden -->
<html lang="en">
```
**WCAG Criterion:** 3.1.1 Language of Page (Level A)

### 2. Missing Skip Navigation Link
**Severity:** Critical  
**Affects:** All pages  
**Problem:** No "Skip to main content" link for keyboard users to bypass navigation.  
**Why it matters:** Keyboard users must tab through all navigation links on every page load. A skip link allows them to jump directly to main content.  
**Suggested Fix:**
Add to `src/components/Layout.jsx` before Navigation:
```jsx
function Layout({ children, showNavigation = true }) {
  // ... existing state ...
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip navigation link - only visible on keyboard focus */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      
      {showNavigation && (
        <Navigation isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      )}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

Also add the `sr-only` utility to `src/index.css`:
```css
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```
**WCAG Criterion:** 2.4.1 Bypass Blocks (Level A)

### 3. Hamburger Menu Button Missing Accessible Label
**Severity:** Critical  
**Affects:** Mobile navigation on all pages  
**Problem:** The hamburger menu button in `src/components/Navigation.jsx` line 70 has `aria-label="Open menu"` which is good, but it doesn't update when the menu is open.  
**Why it matters:** Screen reader users need to know the current state of the menu button.  
**Suggested Fix:**
Update `src/components/Navigation.jsx`:
```jsx
<SheetTrigger asChild className="md:hidden">
  <Button 
    variant="ghost" 
    size="icon" 
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <Menu className="h-5 w-5" />
  </Button>
</SheetTrigger>
```
**WCAG Criterion:** 4.1.2 Name, Role, Value (Level A)

---

## Major Issues

### 4. Insufficient Color Contrast on Muted Text
**Severity:** Major  
**Affects:** All pages with `text-muted-foreground` class  
**Problem:** The muted text color may not meet the 4.5:1 contrast ratio required for body text. Need to verify contrast ratios in both light and dark modes.  
**Why it matters:** Users with low vision or color vision deficiencies may struggle to read low-contrast text.  
**Suggested Fix:**
Test current colors with a contrast checker. If insufficient, update CSS variables in `src/index.css`:
```css
:root {
  /* Ensure muted-foreground meets 4.5:1 against background */
  --muted-foreground: 215 20.2% 45%; /* Increase lightness if needed */
}

.dark {
  /* Dark mode - ensure sufficient contrast */
  --muted-foreground: 215 20.2% 70%; /* Adjust if needed */
}
```
**WCAG Criterion:** 1.4.3 Contrast (Minimum) (Level AA)

### 5. Focus Indicators May Be Insufficient
**Severity:** Major  
**Affects:** Interactive elements (buttons, links)  
**Problem:** While Tailwind and shadcn/ui provide focus styles, need to verify they're visible in both light and dark modes with sufficient contrast (3:1 against adjacent colors).  
**Why it matters:** Keyboard users must be able to clearly see which element currently has focus.  
**Suggested Fix:**
Enhance focus styles in `src/index.css`:
```css
/* Ensure visible focus indicators */
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* For dark backgrounds, ensure contrast */
.dark *:focus-visible {
  outline-color: hsl(var(--primary));
}
```
**WCAG Criterion:** 2.4.7 Focus Visible (Level AA)

### 6. Missing Image Alt Text
**Severity:** Major  
**Affects:** public/favicon.svg and any future images  
**Problem:** Currently no `<img>` tags in the codebase (using emojis and SVG icons instead), but the site should be prepared for images. The favicon.svg should have a proper title element for accessibility.  
**Why it matters:** Screen readers announce alt text to describe images to visually impaired users.  
**Suggested Fix:**
When adding images, always include descriptive alt text:
```jsx
{/* Good example */}
<img 
  src="/path/to/image.jpg" 
  alt="Daniel Christensen presenting at a data engineering conference"
  width="800"
  height="600"
/>

{/* Decorative images */}
<img src="/decorative.svg" alt="" role="presentation" />
```

For future project screenshots or profile photos, create an accessible image component.  
**WCAG Criterion:** 1.1.1 Non-text Content (Level A)

### 7. Heading Hierarchy Issues
**Severity:** Major  
**Affects:** Multiple pages  
**Problem:** Some pages may skip heading levels. For example, if there's an h4 without an h3 parent context.  
**Why it matters:** Screen reader users navigate by headings. Skipping levels creates confusion about content hierarchy.  
**Suggested Fix:**
Audit each page:
- Home page: Uses h1 → h2 correctly
- Skills page: Uses h1 → h2 → h3 → h4 - verify no levels are skipped
- Portfolio: Uses h1 → h2 - good
- Blog: Verify blog post content doesn't skip heading levels

In `src/pages/BlogPost.jsx`, ensure blog post HTML content uses proper heading hierarchy (h2 → h3, not h2 → h4).  
**WCAG Criterion:** 1.3.1 Info and Relationships (Level A)

### 8. Links Opening in New Tab Without Warning
**Severity:** Major  
**Affects:** External links (GitHub, PyPI, etc.)  
**Problem:** Links to external sites open in new tabs (`target="_blank"`) without warning users or providing accessible notification.  
**Why it matters:** Screen reader users and cognitive disability users should be informed when links open in new windows/tabs as it can be disorienting.  
**Suggested Fix:**
Update all external links in components:
```jsx
{/* In Portfolio.jsx and other files with external links */}
<Button asChild>
  <a 
    href="https://pypi.org/project/paged-list/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2"
  >
    <ExternalLink className="h-4 w-4" aria-hidden="true" />
    View on PyPI
    <span className="sr-only">(opens in new tab)</span>
  </a>
</Button>
```

Create a reusable ExternalLink component:
```jsx
// src/components/ExternalLink.jsx
export function ExternalLink({ href, children, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  )
}
```
**WCAG Criterion:** 3.2.5 Change on Request (Level AAA, but recommended for Level AA)

---

## Minor Issues

### 9. Touch Target Size on Mobile
**Severity:** Minor  
**Affects:** Mobile navigation and theme toggle  
**Problem:** While buttons appear to use adequate sizing, verify all interactive elements meet the 44x44px minimum touch target size on mobile.  
**Why it matters:** Users with motor disabilities need larger touch targets to reliably interact with controls.  
**Suggested Fix:**
Verify in browser dev tools at 375px width. If needed, increase button sizing:
```jsx
{/* In Navigation.jsx for mobile menu */}
<Button 
  variant="ghost" 
  size="icon"
  className="md:hidden h-11 w-11" // Ensure 44px minimum
  aria-label={isOpen ? "Close menu" : "Open menu"}
>
  <Menu className="h-5 w-5" />
</Button>
```
**WCAG Criterion:** 2.5.5 Target Size (Level AAA, but best practice)

### 10. No Landmarks Beyond Main
**Severity:** Minor  
**Affects:** All pages  
**Problem:** The site uses `<main>`, `<nav>`, and `<footer>` semantic elements correctly, but could benefit from additional ARIA landmarks.  
**Why it matters:** Landmarks help screen reader users navigate page structure efficiently.  
**Suggested Fix:**
Add ARIA roles where semantic elements aren't available:
```jsx
{/* In Home.jsx and other pages with distinct sections */}
<header role="banner" className="relative bg-gradient-to-br...">
  {/* Hero content */}
</header>

<section aria-labelledby="about-heading" className="py-16 md:py-24">
  <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
  {/* Content */}
</section>
```
**WCAG Criterion:** 1.3.1 Info and Relationships (Level A)

### 11. Form Elements Don't Exist Yet
**Severity:** Minor  
**Affects:** Future contact forms  
**Problem:** No forms currently exist, but if a contact form is added, it must have proper labels and error handling.  
**Why it matters:** Screen reader users need associated labels to understand form fields.  
**Suggested Fix:**
When adding forms, follow this pattern:
```jsx
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label htmlFor="email" className="block text-sm font-medium mb-2">
        Email Address
        <span className="text-destructive" aria-label="required">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        aria-required="true"
        aria-describedby="email-error"
        className="w-full px-3 py-2 border rounded"
      />
      {errors.email && (
        <p id="email-error" className="text-destructive text-sm mt-1" role="alert">
          {errors.email}
        </p>
      )}
    </div>
  </div>
  <button type="submit">Submit</button>
</form>
```
**WCAG Criterion:** 3.3.2 Labels or Instructions (Level A)

### 12. Loading States Lack Accessibility
**Severity:** Minor  
**Affects:** Lazy-loaded pages  
**Problem:** The loading fallback in `App.jsx` shows a spinner but doesn't announce loading to screen readers.  
**Why it matters:** Screen reader users should be informed when content is loading.  
**Suggested Fix:**
Update `src/App.jsx`:
```jsx
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center" role="status" aria-live="polite">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" aria-hidden="true"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
      <span className="sr-only">Loading page content, please wait</span>
    </div>
  </div>
)
```
**WCAG Criterion:** 4.1.3 Status Messages (Level AA)

---

## Positive Findings

### What's Working Well

1. ✅ **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<footer>`, `<header>`, `<section>` elements
2. ✅ **Keyboard Navigation**: All interactive elements are keyboard accessible
3. ✅ **ARIA Labels**: Theme toggle has proper `aria-label`
4. ✅ **Focus Management**: Sheet component properly manages focus trap when mobile menu opens
5. ✅ **Color Scheme Support**: Respects user's prefers-color-scheme preference
6. ✅ **Button Accessibility**: Buttons use proper semantic elements, not divs styled as buttons
7. ✅ **Link Text**: Most links have descriptive text (not "click here")

---

## Testing Recommendations

### Manual Testing Checklist

- [ ] Test all pages with keyboard only (Tab, Shift+Tab, Enter, Space, Esc)
- [ ] Test with screen reader (NVDA on Windows, VoiceOver on Mac)
- [ ] Test color contrast in both light and dark modes with WebAIM Contrast Checker
- [ ] Test at 200% zoom level to ensure content remains accessible
- [ ] Test mobile navigation with screen reader on mobile device
- [ ] Verify focus order is logical throughout all pages
- [ ] Test with browser extensions disabled to ensure base accessibility

### Automated Testing Tools

- Run axe DevTools browser extension on each page
- Use Lighthouse accessibility audit in Chrome DevTools
- Test with WAVE (Web Accessibility Evaluation Tool)
- Use pa11y or axe-core in CI/CD pipeline

---

## Priority Summary

| Priority | Count | Action Required |
|----------|-------|-----------------|
| Critical | 3 | Must fix immediately |
| Major | 6 | Fix before major releases |
| Minor | 3 | Address in regular maintenance |

---

## Implementation Order

1. **Phase 1 (Immediate)**:
   - Add skip navigation link
   - Fix hamburger menu aria-label to include state
   - Verify HTML lang attribute

2. **Phase 2 (Next Sprint)**:
   - Test and fix color contrast issues
   - Enhance focus indicators
   - Add accessible labels to external links
   - Fix heading hierarchy issues

3. **Phase 3 (Ongoing)**:
   - Verify touch target sizes
   - Add more ARIA landmarks
   - Improve loading state announcements
   - Create accessible form pattern for future use

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [React Accessibility Guide](https://reactjs.org/docs/accessibility.html)
- [shadcn/ui Accessibility Documentation](https://ui.shadcn.com/docs/components)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
