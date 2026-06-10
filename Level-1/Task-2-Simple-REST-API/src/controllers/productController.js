/**
 * Product Controller
 * 
 * Handles HTTP requests and responses for product endpoints.
 * Calls the service layer for business logic.
 */

const productService = require('../services/productService');

class ProductController {
  /**
   * Get all products
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllProducts(req, res) {
    try {
      const result = productService.getAllProducts();
      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Get product by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProductById(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      // Validate ID
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data',
          error: 'Product ID must be a valid number'
        });
      }

      const result = productService.getProductById(id);
      
      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Create new product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const result = productService.createProduct(productData);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Update product by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const productData = req.body;
      
      // Validate ID
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data',
          error: 'Product ID must be a valid number'
        });
      }

      const result = productService.updateProduct(id, productData);
      
      if (!result.success) {
        const statusCode = result.message === 'Product not found' ? 404 : 400;
        return res.status(statusCode).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Delete product by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      // Validate ID
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data',
          error: 'Product ID must be a valid number'
        });
      }

      const result = productService.deleteProduct(id);
      
      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

module.exports = new ProductController();
