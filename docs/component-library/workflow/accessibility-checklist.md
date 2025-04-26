# Component Accessibility Checklist

This checklist helps ensure that components in the Hypatia LMS meet accessibility standards and provide a good experience for all users, including those with disabilities.

## Accessibility Compliance Report Template

```markdown
# Accessibility Compliance Report for [ComponentName]

## WCAG 2.1 Compliance Summary

| Criterion | Level | Status | Notes |
|-----------|-------|--------|-------|
| 1.1 Text Alternatives | AA | ✅ Pass | All images have alt text |
| 1.2 Time-based Media | AA | ✅ Pass | No time-based media used |
| 1.3 Adaptable | AA | ✅ Pass | Structure uses semantic HTML |
| 1.4 Distinguishable | AA | ✅ Pass | Color contrast ratio meets standards |
| 2.1 Keyboard Accessible | AA | ✅ Pass | All functionality available via keyboard |
| 2.2 Enough Time | AA | ✅ Pass | No time limits implemented |
| 2.3 Seizures and Physical Reactions | AA | ✅ Pass | No flashing content |
| 2.4 Navigable | AA | ✅ Pass | Clear focus indicators provided |
| 2.5 Input Modalities | AA | ✅ Pass | Multiple input methods supported |
| 3.1 Readable | AA | ✅ Pass | Text is readable and understandable |
| 3.2 Predictable | AA | ✅ Pass | Component behaves predictably |
| 3.3 Input Assistance | AA | ✅ Pass | Error identification and suggestions provided |
| 4.1 Compatible | AA | ✅ Pass | Component uses standard HTML/ARIA |

## Keyboard Navigation

| Action | Keys | Implemented | Notes |
|--------|------|-------------|-------|
| Focus component | Tab | ✅ Yes | |
| Activate component | Enter/Space | ✅ Yes | |
| Navigate options | Arrow keys | ✅ Yes | |
| Close/Cancel | Escape | ✅ Yes | |
| [Additional actions] | [Keys] | ✅ Yes | |

## Screen Reader Testing

| Screen Reader | Browser | Result | Notes |
|---------------|---------|--------|-------|
| NVDA | Chrome | ✅ Pass | |
| NVDA | Firefox | ✅ Pass | |
| VoiceOver | Safari | ✅ Pass | |
| JAWS | Chrome | ✅ Pass | |

## ARIA Implementation

| ARIA Attribute | Used | Purpose | Notes |
|----------------|------|---------|-------|
| aria-label | ✅ Yes | Provides accessible name | |
| aria-labelledby | ✅ Yes | References visible label | |
| aria-describedby | ✅ Yes | References description | |
| aria-expanded | ✅ Yes | Indicates expanded state | |
| aria-controls | ✅ Yes | Indicates controlled element | |
| aria-haspopup | ✅ Yes | Indicates popup presence | |
| aria-selected | ✅ Yes | Indicates selection state | |
| aria-checked | ✅ Yes | Indicates checked state | |
| aria-disabled | ✅ Yes | Indicates disabled state | |
| aria-invalid | ✅ Yes | Indicates validation errors | |
| role | ✅ Yes | Defines component role | |

## Color and Contrast

| Element | Contrast Ratio | Passes AA | Passes AAA | Notes |
|---------|----------------|-----------|------------|-------|
| Primary text | 7:1 | ✅ Yes | ✅ Yes | |
| Secondary text | 4.5:1 | ✅ Yes | ❌ No | |
| UI controls | 3:1 | ✅ Yes | ❌ No | |
| Focus indicators | 3:1 | ✅ Yes | ❌ No | |

## Touch Target Size

| Element | Size | Meets 44x44px | Notes |
|---------|------|---------------|-------|
| Primary controls | 48x48px | ✅ Yes | |
| Secondary controls | 44x44px | ✅ Yes | |
| [Other controls] | [Size] | ✅ Yes | |

## Motion and Animation

| Criterion | Status | Notes |
|-----------|--------|-------|
| Respects reduced motion preferences | ✅ Yes | |
| No auto-playing animations | ✅ Yes | |
| Animations can be paused | ✅ Yes | |
| No content flashing more than 3 times per second | ✅ Yes | |

## Identified Issues and Remediation

| Issue | WCAG Criterion | Severity | Remediation Plan | Status |
|-------|----------------|----------|------------------|--------|
| [Issue description] | [Criterion] | [High/Medium/Low] | [Plan] | [Open/Fixed] |

## Recommendations for Improvement

1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

## Testing Methodology

[Description of testing methodology, tools used, and testing environment]

## Conclusion

[Overall assessment of component accessibility]
```

## Detailed Accessibility Requirements

### 1. Keyboard Accessibility

- [ ] **All functionality is operable through a keyboard**
  - Component can be focused using the Tab key
  - Component can be activated using Enter or Space
  - No keyboard traps (focus can move in and out of the component)
  - Custom keyboard shortcuts are documented

- [ ] **Logical focus order**
  - Tab order follows a logical sequence
  - Focus moves in a direction that makes sense

- [ ] **Focus visibility**
  - Focus indicators are clearly visible
  - Focus indicators have sufficient contrast (3:1 minimum)
  - Focus is never hidden

### 2. Screen Reader Support

- [ ] **Accessible name and description**
  - Component has an accessible name (via label, aria-label, or aria-labelledby)
  - Complex components have descriptions (via aria-describedby if needed)
  - Names and descriptions are meaningful and concise

- [ ] **Role and state information**
  - Appropriate ARIA roles are used when needed
  - Component states are communicated (expanded, selected, checked, etc.)
  - Custom components match expected behavior of native elements

- [ ] **Announcements for dynamic changes**
  - Updates to content are announced to screen readers
  - Error messages are announced
  - Live regions are used appropriately

### 3. Color and Contrast

- [ ] **Sufficient color contrast**
  - Text has a contrast ratio of at least 4.5:1 (AA) or 7:1 (AAA)
  - UI components and graphical objects have a contrast ratio of at least 3:1
  - Focus indicators have a contrast ratio of at least 3:1

- [ ] **Color is not the only means of conveying information**
  - Information conveyed by color is also available through text or icons
  - Status indicators use both color and text/icons
  - Links are underlined or otherwise distinguishable beyond color

### 4. Text and Typography

- [ ] **Text resizing**
  - Text can be resized up to 200% without loss of content or functionality
  - No text is presented as images (except logos)
  - Component adapts to different text sizes

- [ ] **Text spacing**
  - Component works with increased text spacing
  - No content is lost when line height is 1.5 times the font size
  - No content is lost when paragraph spacing is 2 times the font size
  - No content is lost when letter spacing is 0.12 times the font size
  - No content is lost when word spacing is 0.16 times the font size

### 5. Touch and Pointer Accessibility

- [ ] **Adequate touch target size**
  - Interactive elements are at least 44x44 pixels
  - Sufficient spacing between touch targets
  - Touch targets are not overlapping

- [ ] **Multiple input methods**
  - Component works with touch, mouse, and keyboard
  - Gesture-based interactions have alternatives
  - Hover-only interactions have alternatives

### 6. Forms and Input

- [ ] **Clear labels and instructions**
  - All form controls have visible labels
  - Instructions are provided for complex inputs
  - Required fields are clearly indicated

- [ ] **Error prevention and recovery**
  - Validation errors are clearly identified
  - Error messages are specific and helpful
  - Users can correct errors easily
  - Critical actions can be reviewed, confirmed, or reversed

### 7. Motion and Animation

- [ ] **Reduced motion support**
  - Respects prefers-reduced-motion media query
  - Essential animations are subtle and brief
  - No animations that could trigger vestibular disorders

- [ ] **No flashing content**
  - No content flashes more than three times per second
  - No large areas of flashing content

### 8. Structure and Semantics

- [ ] **Proper HTML semantics**
  - Uses appropriate HTML elements for their intended purpose
  - Headings are used in a logical hierarchy
  - Lists are marked up as list elements

- [ ] **ARIA is used correctly**
  - ARIA is only used when necessary
  - ARIA attributes are used according to specification
  - ARIA landmarks are used appropriately

### 9. Responsive and Adaptable

- [ ] **Responsive design**
  - Component adapts to different viewport sizes
  - Content reflows at 320px width without horizontal scrolling
  - Component works in both portrait and landscape orientations

- [ ] **Zoom compatibility**
  - Component works when zoomed to 200%
  - No content or functionality is lost when zoomed

## Testing Tools and Resources

### Automated Testing Tools

- [axe DevTools](https://www.deque.com/axe/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Storybook a11y addon](https://storybook.js.org/addons/@storybook/addon-a11y)

### Manual Testing Tools

- [NVDA](https://www.nvaccess.org/) (Screen reader for Windows)
- [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (Screen reader for macOS)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Screen reader for Windows)
- [Keyboard testing](https://webaim.org/techniques/keyboard/)
- [Color contrast analyzer](https://developer.paciellogroup.com/resources/contrastanalyser/)

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [WebAIM Articles and Resources](https://webaim.org/articles/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
