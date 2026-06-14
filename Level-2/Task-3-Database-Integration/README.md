# Codveda Level 2 - Task 2: Authentication & Authorization

## Project Structure
```
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Prisma schema (User & Product models)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js  # Signup, Login, Logout, Profile
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   └── auth.js           # protect + authorize (RBAC)
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductItem.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   └── ProductsPage.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── productService.js
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Stack
- **Backend**: Node.js, Express, Prisma (PostgreSQL), JWT (jsonwebtoken), bcrypt
- **Frontend**: React, Vite, Axios

## Features
- Password hashing with bcrypt
- JWT stored in HTTP-only cookies
- Role-Based Access Control (USER / ADMIN)
- Protected routes for product write operations
- Login / Signup / Logout UI
- Responsive product management interface

## Prerequisites
- Node.js 18+
- PostgreSQL running locally
- Database: `Codveda`

## Setup

### 1. Backend
```powershell
cd backend
npm install
```

Ensure `.env` contains:
```
DATABASE_URL="postgresql://postgres:osama@localhost:5432/Codveda?schema=public"
JWT_SECRET="your-secret-key"
```

Run database migration:
```powershell
cd backend
npx prisma db push
```

Start server:
```powershell
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### 2. Frontend
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Testing with Postman

See [`backend/TESTING.md`](./backend/TESTING.md) for full API test cases including:
- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/profile`
- GET `/api/products`
- POST `/api/products` (ADMIN only)
- PUT `/api/products/:id` (ADMIN only)
- DELETE `/api/products/:id` (ADMIN only)

## Accounts
When signing up, assign a role:
- `USER` - can view products only
- `ADMIN` - can create, update, and delete products
