import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/api';
import AdminRoute from '../components/AdminRoute';
import Modal from '../components/Modal';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async (page = 1) => {
    setLoadingTable(true);
    try {
      const response = await productService.getAll({ page, limit: pagination.limit });
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoadingTable(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        quantity: product.quantity.toString()
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', quantity: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', quantity: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, formData);
      } else {
        await productService.create(formData);
      }
      closeModal();
      fetchProducts(pagination.page);
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productService.delete(id);
      fetchProducts(pagination.page);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  return (
    <AdminRoute>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        
        <section className="products-table-section">
          <div className="section-header">
            <h2>Products Management</h2>
            <button onClick={() => openModal()} className="btn btn-primary">Add Product</button>
          </div>
          
          {loadingTable && <div className="loading">Loading...</div>}
          
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => openModal(product)} className="btn-icon btn-edit">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="btn-icon btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length > 0 && (
            <div className="pagination">
              <button 
                onClick={prevPage} 
                disabled={pagination.page === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} items)
              </span>
              
              <button 
                onClick={nextPage} 
                disabled={pagination.page === pagination.totalPages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Product name"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              disabled={loading}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Quantity</label>
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
            </button>
            <button 
              type="button" 
              onClick={closeModal}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </AdminRoute>
  );
};

export default AdminDashboard;