import React, { useState } from 'react';
import useProducts from '../hooks/useProducts.js';
import ProductList from '../components/ProductList.jsx';
import ProductForm from '../components/ProductForm.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const ProductsPage = ({ user }) => {
  console.log('ProductsPage user:', user);
  const { products, loading, error, pagination, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handlePageChange = (newPage) => {
    fetchProducts(newPage, pagination.limit);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
      } else {
        await createProduct(data);
      }
      setShowForm(false);
    } catch (err) {
      // Error handled in hook
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const isAdmin = user?.role === 'ADMIN';
  console.log('isAdmin:', isAdmin, 'user role:', user?.role);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchProducts(pagination.page, pagination.limit)} />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Products</h2>
        {isAdmin && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            + Add Product
          </button>
        )}
      </div>
      <ProductList
        products={products}
        onEdit={isAdmin ? handleEditClick : null}
        onDelete={isAdmin ? handleDeleteClick : null}
        isAdmin={isAdmin}
      />
      <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px', padding: '10px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
          style={{ opacity: pagination.page <= 1 ? 0.5 : 1, cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>
        <span className="pagination-info" style={{ fontWeight: 'bold', fontSize: '16px' }}>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
          style={{ opacity: pagination.page >= pagination.totalPages ? 0.5 : 1, cursor: pagination.page >= pagination.totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
      {showForm && isAdmin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
