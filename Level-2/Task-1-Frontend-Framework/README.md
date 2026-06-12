# Level 2 - Task 1: Frontend with JavaScript Framework

A complete product management application with React + Vite frontend and Node.js + Prisma + PostgreSQL backend.

## Project Structure

```
Level-2/Task-1-Frontend-Framework/
├── backend/                    # Node.js + Express + Prisma API
│   ├── src/
│   │   ├── index.js           # Server entry point
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   └── routes/
│   │       └── productRoutes.js
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── package.json
│   └── .env                   # Environment variables
└── frontend/                   # React + Vite application
    ├── src/
    │   ├── components/         # Reusable UI components
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── ErrorMessage.jsx
    │   │   ├── ProductForm.jsx
    │   │   ├── ProductItem.jsx
    │   │   └── ProductList.jsx
    │   ├── pages/
    │   │   └── ProductsPage.jsx
    │   ├── hooks/
    │   │   └── useProducts.js
    │   ├── services/
    │   │   └── productService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Node.js (v18+)
- PostgreSQL (running locally)
- npm or yarn

## Setup Instructions

### 1. Database Setup

Ensure PostgreSQL is running and create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE Codveda;
```

### 2. Backend Setup

```bash
cd backend
npm install
node node_modules/prisma/build/index.js db push --accept-data-loss
node node_modules/prisma/build/index.js generate
npm run dev
```

**Note:** If PostgreSQL connection fails, ensure the database exists and credentials are correct in `.env`. The database was already created with `db push`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL="postgresql://postgres:osama@localhost:5432/Codveda?schema=public"
```

- `DATABASE_URL`: PostgreSQL connection string
- Username: `postgres`
- Password: `osama`
- Database: `Codveda`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create new product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

## Running the Application

1. Start PostgreSQL server
2. Run backend: `cd backend && npm run dev` (http://localhost:5000)
3. Run frontend: `cd frontend && npm run dev` (http://localhost:5173)

## Features

- Full CRUD operations on products
- Real PostgreSQL database integration via Prisma
- Loading and error states
- Responsive design
- Modal-based form for add/edit
- Proxy configuration for API calls