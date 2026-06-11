/**
 * Express App Configuration
 * 
 * Configures the Express application with middleware and routes.
 */

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// API Routes
app.use('/api/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Codveda REST API - Level 1 Task 2',
    version: '1.0.0',
    endpoints: {
      products: '/api/products'
    }
  });
});

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(globalErrorHandler);

module.exports = app;
