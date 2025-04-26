# Version Compatibility Matrix: ForgotPasswordModern Component

## Overview

This matrix outlines the compatibility of the `ForgotPasswordModern` component with different versions of key dependencies and the Hypatia LMS application.

## Compatibility Matrix

| Dependency / Application | Version | Compatibility | Notes |
|--------------------------|---------|---------------|-------|
| React                    | ^18.0.0 | Compatible    |       |
| react-router-dom         | ^6.0.0  | Compatible    | Used for navigation links |
| @reduxjs/toolkit         | ^1.0.0  | Compatible    | Used by `useNotification` hook |
| react-redux              | ^8.0.0  | Compatible    | Used by `useNotification` hook |
| firebase                 | ^9.0.0  | Compatible    | Used by `useAuth` hook |
| uuid                     | ^8.0.0  | Compatible    | Used by `useNotification` hook |
| Hypatia LMS Application  | ^1.0.0  | Compatible    | Assumes integration within the modern application structure |

## Notes

-   Compatibility is based on the current implementation and typical usage within the Hypatia LMS modern frontend.
-   Major version updates of dependencies may require testing and potential updates to the component.
-   The Hypatia LMS Application version refers to the modern frontend version.

## Status

Up-to-date with current dependencies.
