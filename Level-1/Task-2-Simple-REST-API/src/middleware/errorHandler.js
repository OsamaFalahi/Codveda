/**
 * Error Handler Middleware
 * 
 * Global error handling middleware for Express.
 * Catches and formats errors consistently across the application.
 */

/**
 * 404 Not Found Handler
 * Handles requests to non-existent routes
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
}

/**
 * Global Error Handler
 * Catches all errors and returns consistent error response
 */
function globalErrorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
