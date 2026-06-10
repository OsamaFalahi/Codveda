/**
 * Product Service
 * 
 * Contains business logic for product operations.
 * Acts as a bridge between controllers and models.
 */

const productModel = require('../models/productModel');

class ProductService {
  /**
   * Get all products
   * @returns {Object} Response object with products data
   */
  getAllProducts() {
    try {
      const products = productModel.getAll();
      return {
        success: true,
        message: 'Products retrieved successfully',
        data: products
      };
    } catch (error) {
      throw new Error('Failed to retrieve products');
    }
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Object} Response object with product data
   */
  getProductById(id) {
    try {
      const product = productModel.getById(id);
      
      if (!product) {
        return {
          success: false,
          message: 'Product not found',
          error: `Product with ID ${id} does not exist`
        };
      }

      return {
        success: true,
        message: 'Product retrieved successfully',
        data: product
      };
    } catch (error) {
      throw new Error('Failed to retrieve product');
    }
  }

  /**
   * Create new product
   * @param {Object} productData - Product data
   * @returns {Object} Response object with created product
   */
  createProduct(productData) {
    try {
      // Validate required fields
      if (!productData.name || !productData.price || !productData.category) {
        return {
          success: false,
          message: 'Invalid input data',
          error: 'Name, price, and category are required'
        };
      }

      // Validate price is a number
      if (typeof productData.price !== 'number' || productData.price <= 0) {
        return {
          success: false,
          message: 'Invalid input data',
          error: 'Price must be a positive number'
        };
      }

      const newProduct = productModel.create(productData);
      
      return {
        success: true,
        message: 'Product created successfully',
        data: newProduct
      };
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  /**
   * Update product by ID
   * @param {number} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Object} Response object with updated product
   */
  updateProduct(id, productData) {
    try {
      // Validate required fields
      if (!productData.name || !productData.price || !productData.category) {
        return {
          success: false,
          message: 'Invalid input data',
          error: 'Name, price, and category are required'
        };
      }

      // Validate price is a number
      if (typeof productData.price !== 'number' || productData.price <= 0) {
        return {
          success: false,
          message: 'Invalid input data',
          error: 'Price must be a positive number'
        };
      }

      const updatedProduct = productModel.update(id, productData);
      
      if (!updatedProduct) {
        return {
          success: false,
          message: 'Product not found',
          error: `Product with ID ${id} does not exist`
        };
      }

      return {
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
      };
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  /**
   * Delete product by ID
   * @param {number} id - Product ID
   * @returns {Object} Response object
   */
  deleteProduct(id) {
    try {
      const deleted = productModel.delete(id);
      
      if (!deleted) {
        return {
          success: false,
          message: 'Product not found',
          error: `Product with ID ${id} does not exist`
        };
      }

      return {
        success: true,
        message: 'Product deleted successfully',
        data: { id: id }
      };
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}

module.exports = new ProductService();
