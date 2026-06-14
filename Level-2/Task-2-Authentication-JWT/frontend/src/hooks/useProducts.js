import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService.js';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    try {
      const response = await productService.create(productData);
      setProducts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create product');
      throw err;
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      const response = await productService.update(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      return response.data;
    } catch (err) {
      setError('Failed to update product');
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete product');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
};

export default useProducts;