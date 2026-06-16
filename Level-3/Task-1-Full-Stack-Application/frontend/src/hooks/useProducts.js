import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await productService.getAll({ page, limit: pagination.limit });
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const nextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchProducts(pagination.page + 1);
    }
  };

  const prevPage = () => {
    if (pagination.page > 1) {
      fetchProducts(pagination.page - 1);
    }
  };

  return {
    products,
    pagination,
    loading,
    error,
    nextPage,
    prevPage,
    refetch: fetchProducts
  };
};