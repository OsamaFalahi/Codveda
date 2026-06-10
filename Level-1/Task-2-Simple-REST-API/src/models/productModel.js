/**
 * Product Model
 * 
 * Manages in-memory storage of products.
 * In a real application, this would interact with a database.
 */

class ProductModel {
  constructor() {
    // Initialize with some sample data
    this.products = [
      {
        id: 1,
        name: 'Laptop',
        price: 999.99,
        category: 'Electronics'
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        price: 29.99,
        category: 'Accessories'
      },
      {
        id: 3,
        name: 'Mechanical Keyboard',
        price: 149.99,
        category: 'Accessories'
      }
    ];
    this.nextId = 4;
  }

  /**
   * Get all products
   * @returns {Array} Array of products
   */
  getAll() {
    return this.products;
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Object|null} Product object or null if not found
   */
  getById(id) {
    return this.products.find(product => product.id === id) || null;
  }

  /**
   * Create new product
   * @param {Object} productData - Product data
   * @returns {Object} Created product
   */
  create(productData) {
    const newProduct = {
      id: this.nextId++,
      name: productData.name,
      price: productData.price,
      category: productData.category
    };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
   * Update product by ID
   * @param {number} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Object|null} Updated product or null if not found
   */
  update(id, productData) {
    const index = this.products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return null;
    }

    this.products[index] = {
      id: id,
      name: productData.name,
      price: productData.price,
      category: productData.category
    };

    return this.products[index];
  }

  /**
   * Delete product by ID
   * @param {number} id - Product ID
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);
    return true;
  }
}

// Export singleton instance
module.exports = new ProductModel();
