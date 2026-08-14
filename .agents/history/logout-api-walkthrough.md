# Logout API Implementation Walkthrough

This document outlines the changes made to the `expiry-date-express-server` to implement the `/auth/logout` API.

## Summary of Changes

### 1. `src/controllers/authController.js`
Added a `logout` handler to clear the JWT token cookie.
- The handler calls `response.clearCookie('jwtToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })`.
- It uses the exact same cookie options as the `login` handler to ensure the browser properly clears the cookie.
- It returns a `200 OK` response with a JSON payload: `{ message: 'Logged out successfully' }`.

### 2. `src/routes/authRoutes.js`
Registered the `POST /auth/logout` route and added Swagger documentation.
- **Route:** `router.post('/logout', authController.logout);`
- **Swagger Docs:** Added JSDoc comments to describe the endpoint, specifying the `security: cookieAuth` requirement and the expected `200` response schema.

## Verification

The API was verified using a local script testing the endpoint:
1. **Without Cookie:** Returns `200 OK` and clears the cookie (idempotent behavior).
2. **With Cookie:** Returns `200 OK` and successfully expires the `jwtToken` cookie.
