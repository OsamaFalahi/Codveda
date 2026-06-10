# Level 1 - Task 2: Build a Simple REST API

## Overview
This task demonstrates the creation of a RESTful API using Node.js and Express framework. The API implements CRUD operations on a Products resource with proper error handling and HTTP status codes.

---

## 📋 Features
- ✅ RESTful API architecture
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Clean Architecture pattern
- ✅ Proper error handling
- ✅ HTTP status codes (200, 201, 404, 500)
- ✅ JSON request/response format
- ✅ In-memory data storage (products array)

---

## 🏗️ Project Structure

```
Task-2-Simple-REST-API/
├── src/
│   ├── controllers/        # Request handlers
│   │   └── productController.js
│   ├── routes/            # API route definitions
│   │   └── productRoutes.js
│   ├── middleware/        # Custom middleware
│   │   └── errorHandler.js
│   ├── models/            # Data models
│   │   └── productModel.js
│   ├── services/          # Business logic
│   │   └── productService.js
│   ├── app.js             # Express app configuration
│   └── server.js          # Server entry point
├── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/products
```

### Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/products` | Get all products | 200, 500 |
| GET | `/api/products/:id` | Get product by ID | 200, 404, 500 |
| POST | `/api/products` | Create new product | 201, 400, 500 |
| PUT | `/api/products/:id` | Update product by ID | 200, 404, 400, 500 |
| DELETE | `/api/products/:id` | Delete product by ID | 200, 404, 500 |

---

## 🧪 Testing the API

### Using cURL

#### Get All Products
```bash
curl http://localhost:3000/api/products
```

#### Get Product by ID
```bash
curl http://localhost:3000/api/products/1
```

#### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99,"category":"Electronics"}'
```

#### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Gaming Laptop","price":1299.99,"category":"Electronics"}'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

### Using Postman or Insomnia
Import the endpoints and test with the following request bodies:

**Create/Update Product:**
```json
{
  "name": "Product Name",
  "price": 99.99,
  "category": "Category Name"
}
```

---

## 📊 Response Examples

### Success Response (200)
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics"
    }
  ]
}
```

### Created Response (201)
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 4,
    "name": "New Product",
    "price": 49.99,
    "category": "Accessories"
  }
}
```

### Not Found Response (404)
```json
{
  "success": false,
  "message": "Product not found",
  "error": "Product with ID 999 does not exist"
}
```

### Bad Request Response (400)
```json
{
  "success": false,
  "message": "Invalid input data",
  "error": "Name, price, and category are required"
}
```

### Server Error Response (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details here"
}
```

---

## 🏛️ Architecture Overview

### Clean Architecture Layers

1. **Routes Layer** (`routes/`)
   - Defines API endpoints
   - Maps HTTP methods to controllers

2. **Controller Layer** (`controllers/`)
   - Handles HTTP requests/responses
   - Validates input data
   - Calls service layer

3. **Service Layer** (`services/`)
   - Contains business logic
   - Processes data transformations
   - Calls model layer

4. **Model Layer** (`models/`)
   - Defines data structure
   - Manages data storage (in-memory array)

5. **Middleware Layer** (`middleware/`)
   - Error handling
   - Request logging (future)

---

## 🔧 Configuration

### Server Configuration
- **Port:** 3000 (configurable in `src/server.js`)
- **Environment:** Development

### Product Data Structure
```javascript
{
  id: Number,        // Unique identifier
  name: String,      // Product name (required)
  price: Number,     // Product price (required)
  category: String   // Product category (required)
}
```

---

## 📝 Code Highlights

### Error Handling
- Custom error middleware for consistent error responses
- Proper HTTP status codes
- Detailed error messages

### Validation
- Input validation for required fields
- Type checking for numeric fields
- ID validation for update/delete operations

### Clean Code Principles
- Separation of concerns
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Meaningful variable names
- Proper comments

---

## 🎯 Learning Objectives Achieved

- ✅ Created Express server
- ✅ Implemented CRUD operations
- ✅ Applied Clean Architecture
- ✅ Proper error handling
- ✅ Correct HTTP status codes
- ✅ JSON request/response format
- ✅ RESTful API design

---

## 🚧 Future Enhancements

- Add database integration (PostgreSQL)
- Implement authentication/authorization
- Add input validation library (Joi/Zod)
- Add logging middleware
- Implement pagination
- Add unit and integration tests
- Add API documentation (Swagger)

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [REST API Best Practices](https://restfulapi.net/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

**Prepared by:** Codveda Training Intern  
**Date:** June 2026  
**Level:** 1 - Task 2
