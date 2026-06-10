/**
 * Server Entry Point
 * 
 * Starts the Express server and listens for incoming requests.
 */

const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║          CODEVEDA REST API SERVER STARTED                  ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
  console.log('');
  console.log('Available Endpoints:');
  console.log('  GET    /api/products          - Get all products');
  console.log('  GET    /api/products/:id      - Get product by ID');
  console.log('  POST   /api/products          - Create new product');
  console.log('  PUT    /api/products/:id      - Update product by ID');
  console.log('  DELETE /api/products/:id      - Delete product by ID');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    console.log('Server closed due to unhandled promise rejection');
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
    console.log('Server closed due to uncaught exception');
    process.exit(1);
  });
});

module.exports = server;
