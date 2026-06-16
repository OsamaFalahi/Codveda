
```markdown
# Full-Stack Web & Mobile Development Training - Codveda

Welcome to my official repository for the Codveda Full-Stack Development Training program. This repository documents a progressive, multi-level engineering journey—moving from fundamental REST APIs to building an industry-standard, secure, and production-ready Full-Stack Application with real-time capabilities.

---

## 🏗️ Project Architecture & Repository Structure

This repository is organized as a unified workspace containing all three progressive training levels:


.
├── Level-1/
│   ├── Task-1-Basic-HTML-CSS/
│   └── Task-2-Simple-REST-API/       # Node.js/Express server using in-memory arrays
├── Level-2/
│   ├── Task-1-React-Frontend/         # Independent React UI development
│   ├── Task-2-Auth-Authorization/     # Advanced security layout (Bcrypt, JWT in HTTP-only Cookies)
│   └── Task-3-Database-Integration/   # Production-ready Database tier (Validation, Indexes, Pagination)
└── Level-3/
    └── Task-1-Full-Stack-App/         # Consolidated full-stack platform with Socket.io integration
        ├── backend/                   # Scalable Express & Database engine
        └── frontend/                  # Responsive React client (Vite)


---

## 📈 Detailed Breakdown of Training Levels

### 🔴 Level 1: Foundation (Basics)

* **Task 1: Web Interface Basics:** Building semantic layouts utilizing HTML5 and responsive CSS3.
* **Task 2: Simple REST API:** Developing a lightweight Node.js/Express server to handle basic CRUD operations, interacting with data stored dynamically within volatile, in-memory arrays.

### 🟡 Level 2: Intermediate (State Management, Security & Database Optimization)

* **Task 1: React UI Creation:** Developing reusable components, implementing routing via React Router, and managing frontend state efficiently.
* **Task 2: Authentication & Authorization:** Implemented robust backend security by hashing credentials with `bcrypt` and issuing JSON Web Tokens (JWT). Tokens are stored strictly in **HTTP-only Cookies** to eliminate XSS theft vectors, combined with custom middleware for Role-Based Access Control (RBAC).
* **Task 3: Database Integration:** Migrating from in-memory structures to a production database. Developed data validations, added **Database Indexes** on high-traffic lookup paths (e.g., unique index on `email`), and integrated cursor/query **Pagination** (`?page=1&limit=10`) for optimal performance.

### 🟢 Level 3: Advanced (Integration, Real-Time & Deployment)

* **Task 1: Full-Stack Application Integration:** Combining the decoupled React frontend and the secure Express backend into a seamless, high-performance web platform.
* **Task 2: Real-Time Communication Layer:** Supercharging user engagement via WebSockets using **Socket.io**. Admins can push product/event creations or updates, triggering instant UI state changes across all connected client browser contexts with elegant toast notifications without manual page reloads.

---

## 🛠️ Tech Stack & Key Libraries

* **Frontend:** React.js (Vite), React Router DOM, Axios, TailwindCSS / Custom CSS, React-Toastify.
* **Backend:** Node.js, Express.js, Socket.io (WebSockets).
* **Database & Security:** MongoDB / SQL Database, Bcrypt (Password Hashing), JSON Web Tokens (JWT), Cookie-Parser.

---

## 🚀 Local Installation & Quick Start

Follow these steps to run the comprehensive **Level 3 Full-Stack Application** locally on your machine:

### 1. Prerequisites

Ensure you have **Node.js (v18+)** and your database instance (MongoDB/SQL) installed and running.

### 2. Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/Codveda.git](https://github.com/YOUR_USERNAME/Codveda.git)
cd Codveda/Level-3/Task-1-Full-Stack-App

```

### 3. Setting Up the Backend

1. Navigate to the backend directory:

```bash
   cd backend

```

2. Install dependencies:

```bash
   npm install

```

3. Configure your Environment Variables by creating a `.env` file in the root of the backend folder:

```env
   PORT=5000
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_super_secure_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development

```

4. Start the development server:

```bash
   npm run dev

```

### 4. Setting Up the Frontend

1. Open a new terminal window and navigate to the frontend directory:

```bash
   cd ../frontend

```

2. Install dependencies:

```bash
   npm install

```

3. Start the Vite development server:

```bash
   npm run dev

```

---

## 🧪 Comprehensive API Testing & Postman Walkthrough

The backend API exposes explicit, highly secured endpoints. You can run automated or manual validation checks using **Postman** or **Thunder Client** using the following pipeline:

### 🔐 Authentication Endpoints (`/api/auth`)

* **POST** `/api/auth/signup` - Registers a new user account.
* *Payload:* `{ "username": "osama", "email": "osama@example.com", "password": "password123", "role": "USER" }`


* **POST** `/api/auth/login` - Authenticates user & injects an HTTP-only cookie token.
* *Payload:* `{ "email": "osama@example.com", "password": "password123" }`


* **GET** `/api/auth/profile` - Fetches the authenticated user profile *(Requires valid cookie via `protect` middleware)*.
* **POST** `/api/auth/logout` - Clears authentication context cookies.

### 📦 Product/Event Endpoints (`/api/products`)

* **GET** `/api/products?page=1&limit=10` - Public access route fetching paginated entries.
* **POST** `/api/products` - Creates a new item *(Restricted: **ADMIN ONLY** via `authorize` middleware)*.
* **PUT** `/api/products/:id` - Updates a target item *(Restricted: **ADMIN ONLY**)*.
* **DELETE** `/api/products/:id` - Deletes a target item *(Restricted: **ADMIN ONLY**)*.

---

## 🌐 Cloud Deployment Setup

This production model is optimized for frictionless continuous cloud deployment (e.g., Render, Railway, or Vercel):

* **Static Serving:** When running under `NODE_ENV=production`, the Express server automatically serves compiled React static assets from the frontend build directory (`/dist`).
* **Cross-Origin Configuration:** CORS protocols are dynamically bound to custom cloud domain environments to secure real-time WebSocket linkages.

---

## 👨‍💻 Developer Author

* **Osama AlFalahi** - Full Stack Developer / Software Engineer
* *Graduated with a degree in Information Technology from the University of Modern Sciences.*

