import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService.js';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const fetchProducts = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll(page, limit);
      setProducts(response.data.products || []);
      setPagination(response.data.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      });
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    try {
      await productService.create(productData);
      await fetchProducts(pagination.page, pagination.limit);
    } catch (err) {
      setError('Failed to create product');
      throw err;
    }
  }, [fetchProducts, pagination.page, pagination.limit]);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      await productService.update(id, productData);
      await fetchProducts(pagination.page, pagination.limit);
    } catch (err) {
      setError('Failed to update product');
      throw err;
    }
  }, [fetchProducts, pagination.page, pagination.limit]);

  const deleteProduct = useCallback(async (id) => {
    try {
      await productService.delete(id);
      await fetchProducts(pagination.page, pagination.limit);
    } catch (err) {
      setError('Failed to delete product');
      throw err;
    }
  }, [fetchProducts, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchProducts(pagination.page, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
};

export default useProducts;
