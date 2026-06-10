/**
 * Product Routes
 * 
 * Defines API endpoints for product operations.
 * Maps HTTP methods to controller functions.
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', productController.getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', productController.getProductById);

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Public
 */
router.post('/', productController.createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product by ID
 * @access  Public
 */
router.put('/:id', productController.updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product by ID
 * @access  Public
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
