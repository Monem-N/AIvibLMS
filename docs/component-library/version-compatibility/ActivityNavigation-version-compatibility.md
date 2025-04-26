# ActivityNavigation - Version Compatibility Matrix

**Date:** 2025-04-25

This matrix outlines the compatibility of the `ActivityNavigation` component with key dependencies and browser versions.

## Dependencies

| Dependency         | Version Constraint | Compatible Versions | Notes                                                                 |
|--------------------|--------------------|---------------------|-----------------------------------------------------------------------|
| React              | `^17.0.0` || `^18.0.0`   | `^17.x`, `^18.x`    | Relies on core React hooks (`useState`, `useEffect`).                 |
| React DOM          | `^17.0.0` || `^18.0.0`   | `^17.x`, `^18.x`    | Required for rendering.                                               |
| React Router DOM   | `^5.2.0` || `^6.0.0`   | `^5.x`, `^6.x`      | Uses `<Link>` component. Check for breaking changes between v5/v6. |
| React Redux        | `^7.2.0` || `^8.0.0`   | `^7.x`, `^8.x`      | Uses `useSelector`, `useDispatch`.                                    |
| Redux              | `^4.0.0`           | `^4.x`              | Core state management library.                                        |
| Redux Thunk        | `^2.3.0`           | `^2.x`              | Assumed middleware for `fetchModuleActivities` action (verify).       |
| TypeScript         | `^4.1.0` || `^5.0.0`   | `^4.x`, `^5.x`      | Component written in TypeScript.                                      |

*Note: Version constraints are based on typical project setups and should be verified against the actual `package.json`.*

## Browsers

| Browser          | Minimum Version | Notes                                     |
|------------------|-----------------|-------------------------------------------|
| Chrome           | 80+             | Standard features (Flexbox, CSS Vars).    |
| Firefox          | 78+             | Standard features.                        |
| Safari           | 13.1+           | Standard features.                        |
| Edge (Chromium)  | 80+             | Standard features.                        |
| Internet Explorer| Not Supported   | Modern JS/CSS features likely incompatible. |

## Notes

*   Compatibility relies heavily on the correct setup of React Router and Redux within the application.
*   The `fetchModuleActivities` action and the structure of the Redux state (`state.activities`) are critical external dependencies.
*   CSS compatibility depends on the features used (Flexbox, CSS variables, etc.) and any necessary polyfills or autoprefixing configured in the build process.
