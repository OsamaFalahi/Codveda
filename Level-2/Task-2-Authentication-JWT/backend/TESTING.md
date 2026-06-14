# Task 2: Authentication & Authorization - Testing Guide

## Server URL
Base URL: `http://localhost:5000`

---

## 1. Signup (Register)

### Request
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json
```

### Body (raw JSON)
```json
{
  "email": "admin@codveda.com",
  "password": "StrongPass123",
  "name": "Admin User",
  "role": "ADMIN"
}
```

### Expected Response (201)
```json
{
  "id": 1,
  "email": "admin@codveda.com",
  "name": "Admin User",
  "role": "ADMIN",
  "createdAt": "2026-06-11T10:00:00.000Z"
}
```

---

## 2. Login

### Request
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json
```

### Body (raw JSON)
```json
{
  "email": "admin@codveda.com",
  "password": "StrongPass123"
}
```

### Expected Response (200)
The JWT token is stored in an **HTTP-only Cookie** named `token`. The body returns the user object.

```json
{
  "id": 1,
  "email": "admin@codveda.com",
  "name": "Admin User",
  "role": "ADMIN",
  "createdAt": "2026-06-11T10:00:00.000Z",
  "updatedAt": "2026-06-11T10:00:00.000Z"
}
```

---

## 3. Logout

### Request
```
POST http://localhost:5000/api/auth/logout
```
(Cookies are auto-handled by Postman)

### Expected Response (200)
```json
{
  "message": "Logged out successfully"
}
```

---

## 4. Get Profile (Protected Route)

### Request
```
GET http://localhost:5000/api/auth/profile
```
Note: Must be logged in (have `token` cookie from login/signup).

### Expected Response (200)
```json
{
  "id": 1,
  "email": "admin@codveda.com",
  "name": "Admin User",
  "role": "ADMIN",
  "createdAt": "2026-06-11T10:00:00.000Z"
}
```

---

## 5. Get All Products (Public)

### Request
```
GET http://localhost:5000/api/products
```

### Expected Response (200)
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics",
    "userId": 1
  }
]
```

---

## 6. Create Product (Protected - Admin Only)

### Request
```
POST http://localhost:5000/api/products
Content-Type: application/json
```
Note: Must be logged in AND have role `ADMIN`.

### Body (raw JSON)
```json
{
  "name": "iPhone 16",
  "price": 1099.99,
  "category": "Electronics"
}
```

### Expected Response (201)
```json
{
  "id": 3,
  "name": "iPhone 16",
  "price": 1099.99,
  "category": "Electronics",
  "userId": 1
}
```

### Error (403 - Forbidden) if user role is `USER`:
```json
{
  "error": "Role not authorized"
}
```

---

## 7. Update Product (Protected - Admin Only)

### Request
```
PUT http://localhost:5000/api/products/3
Content-Type: application/json
```

### Body (raw JSON)
```json
{
  "name": "iPhone 16 Pro",
  "price": 1199.99,
  "category": "Electronics"
}
```

### Expected Response (200)
```json
{
  "id": 3,
  "name": "iPhone 16 Pro",
  "price": 1199.99,
  "category": "Electronics",
  "userId": 1
}
```

---

## 8. Delete Product (Protected - Admin Only)

### Request
```
DELETE http://localhost:5000/api/products/3
```

### Expected Response (204 - No Content)

---

## Security Notes

1. **HTTP-only Cookies**: The JWT is stored in an HTTP-only cookie and never exposed to JavaScript. This prevents XSS attacks from stealing the token.
2. **Bcrypt**: Passwords are hashed with bcrypt (10 salt rounds) before storage. The original password is never saved.
3. **Role-Based Access Control**: Only users with `role: "ADMIN"` can create, update, or delete products.
4. **Protected Routes**: All product write operations (POST/PUT/DELETE) require authentication via `protect` middleware.

## Default User Roles

When signing up, you can assign a role. Valid roles in this implementation:
- `USER` - Can read products only
- `ADMIN` - Can read, create, update, and delete products

## Example Test Sequence

1. **Signup** as `admin` with role `ADMIN`
2. **Login** - copy the cookie from the response headers in Postman (Postman handles cookies automatically if you use the same session)
3. **Create Product** (as Admin) - should succeed
4. **Login** as a regular user (role `USER`)
5. **Create Product** (as User) - should fail with 403

## Notes for Postman

- When using Postman, ensure **"Cookie"** handling is enabled in Settings.
- Cookies are domain-scoped to `localhost`.
- In a production environment, set `secure: true` in `authController.js` cookie options to enforce HTTPS-only cookies.
