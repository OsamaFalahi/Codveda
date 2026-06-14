# Schema Validation Rules

## User Model Validation

| Field | Constraints |
|---|---|
| `email` | Required, unique, valid email format, max 255 characters |
| `password` | Required, string, min 6 characters, max 255 characters |
| `name` | Optional, max 255 characters |
| `role` | Optional enum, allowed values: `USER`, `ADMIN`, defaults to `USER` |

## Product Model Validation

| Field | Constraints |
|---|---|
| `name` | Required, string, max 255 characters |
| `description` | Required, string, max 1000 characters |
| `price` | Required, non-negative number |
| `quantity` | Required, non-negative integer |

## Validation Implementation

- **Backend**: Zod schemas in controllers (`authController.js`, `productController.js`)
- **Database**: Prisma schema with `@db.VarChar` length constraints and `@unique` on email
