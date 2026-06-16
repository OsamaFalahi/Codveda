# Codveda Full-Stack Application

A complete full-stack application with authentication, role-based authorization, and product management.

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
│   │   └── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ProductItem.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── Dockerfile
├── render.yaml
├── package.json
└── README.md
```

## Stack
- **Backend**: Node.js, Express, Prisma (PostgreSQL), JWT (jsonwebtoken), bcrypt
- **Frontend**: React 18, Vite, Axios, React Router

## Features

### Authentication
- Password hashing with bcrypt
- JWT stored in HTTP-only cookies with `withCredentials: true`
- Role-Based Access Control (USER / ADMIN)

### Frontend Pages
- `/` - Landing page with products listing and pagination
- `/login` - User login
- `/signup` - User registration
- `/profile` - Protected user profile page
- `/admin-dashboard` - Admin-only dashboard for product CRUD operations

### Protected Routes
- `ProtectedRoute` - Redirects unauthenticated users to login
- `AdminRoute` - Restricts access to ADMIN role only, shows "Access Denied" for regular users

## Prerequisites
- Node.js 18+
- PostgreSQL running locally
- Database: `Codveda`

## Setup

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Backend Configuration

Ensure `backend/.env` contains:
```
DATABASE_URL="postgresql://postgres:osama@localhost:5432/Codveda?schema=public"
JWT_SECRET="your-secret-key"
```

Run database migration:
```bash
npm run db:push
```

### 3. Development Mode

Start both frontend and backend:
```bash
npm run dev
```

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`

### 4. Production Mode

Build and start:
```bash
npm run build
npm start
```

The backend will serve the built frontend static files.

## Deployment

### Docker Deployment

Build and run with Docker:
```bash
docker build -t codveda-app .
docker run -p 5000:5000 -e JWT_SECRET=your-secret -e DATABASE_URL=your-db-url codveda-app
```

### Render Deployment

The `render.yaml` file is configured for automatic deployment on Render:

1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Add environment variables:
   - `JWT_SECRET` (auto-generated)
   - `DATABASE_URL` (from Render PostgreSQL add-on)
5. Deploy!

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get authenticated user profile

### Products
- `GET /api/products?page=1&limit=10` - Get paginated products
- `POST /api/products` - Create product (ADMIN only)
- `PUT /api/products/:id` - Update product (ADMIN only)
- `DELETE /api/products/:id` - Delete product (ADMIN only)

## User Roles

| Route | USER | ADMIN |
|-------|------|-------|
| /login | ✅ | ✅ |
| /signup | ✅ | ✅ |
| /profile | ✅ | ✅ |
| /admin-dashboard | ❌ Access Denied | ✅ |
| Products listing | ✅ | ✅ |
| Create/Update/Delete products | ❌ | ✅ |

## Testing

See `backend/TESTING.md` for complete API test cases.