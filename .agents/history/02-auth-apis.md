# Walkthrough: Auth APIs — Login & Register

**Date:** 2026-08-13  
**Status:** ✅ Completed & Verified by User

---

## Goal

Implement authentication REST APIs (`POST /auth/register` and `POST /auth/login`) for the Expiry Date Manager backend, following the strict Controller-Service-Repository (DAO) pattern defined in `.agents/skills/instructions.md`. All new APIs include Swagger documentation.

---

## Changes Made

### 📦 New Dependencies Installed

| Package | Purpose |
|---|---|
| `swagger-jsdoc` | Generates OpenAPI 3.0 spec from JSDoc annotations in route files |
| `swagger-ui-express` | Serves interactive Swagger UI at `/api-docs` |

---

### 📄 Files Created

#### `src/models/user.js`
Mongoose schema defining the `User` collection with fields:
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- Auto `createdAt` / `updatedAt` via `timestamps: true`

#### `src/dao/userDao.js`
Database access layer — all Mongoose calls isolated here:
- `findByEmail(email)` — finds a user by email
- `createUser(userData)` — creates and saves a new user document

#### `src/services/authService.js`
Business logic layer — no Express request/response objects:
- `register(name, email, password)` — checks for duplicate email (throws `409`), hashes password with `bcryptjs` (10 salt rounds), persists via DAO
- `login(email, password)` — fetches user, compares password with `bcrypt.compare`, signs a JWT (1h expiry) with `jsonwebtoken`

#### `src/controllers/authController.js`
Handles HTTP concerns only — validates input, delegates to service, forms responses:
- `register` — returns `201` with sanitized user object on success
- `login` — returns `200`, sets `jwtToken` as `httpOnly`, `sameSite: strict` cookie

#### `src/routes/authRoutes.js`
Registers routes on `express.Router()` with inline `express-validator` validators and full **OpenAPI 3.0 Swagger JSDoc** annotations:
- `POST /auth/register`
- `POST /auth/login`

#### `src/config/swagger.js`
Configures `swagger-jsdoc` to scan all `src/routes/*.js` files for annotations, then mounts the Swagger UI via `swagger-ui-express` at `/api-docs`.

---

### ✏️ Files Modified

#### `server.js`
- Imports `mongoose`, `setupSwagger`, and `authRoutes`
- Connects to MongoDB (`MONGO_URI` from `.env`) before starting the server
- Server only starts after a successful DB connection; exits with code `1` on failure
- Mounts auth routes at `/auth`
- Registers Swagger UI at `/api-docs`

---

## Architecture Compliance

| Rule | Status |
|---|---|
| Routes → Controllers only | ✅ |
| Controllers → Services | ✅ |
| Services → DAOs | ✅ |
| Swagger generated for every new API | ✅ |
| Approval obtained before changes | ✅ |

---

## Key Behaviours

- 🔐 Passwords hashed with `bcryptjs` (10 salt rounds) — never stored in plaintext
- 🍪 JWT returned as `httpOnly`, `sameSite: strict` cookie — not accessible via JS
- 📋 Swagger UI auto-generated at `http://localhost:5001/api-docs`
- ❌ Duplicate email registration → `409 Conflict`
- ❌ Wrong credentials → `400 Bad Request`
- ❌ Validation failures → `400` with detailed `errors` array

---

## Verification

- Server started and connected to MongoDB successfully
- `POST /auth/register` created user with hashed password confirmed in DB
- `POST /auth/login` returned `200` and set `jwtToken` cookie
- Swagger UI accessible at `/api-docs` with both endpoints documented
- User tested and approved ✅

---

## How to Run

```bash
# Ensure MongoDB is running, then:
npm run dev
```

Endpoints available at:
- `POST http://localhost:5001/auth/register`
- `POST http://localhost:5001/auth/login`
- `GET  http://localhost:5001/api-docs` (Swagger UI)
