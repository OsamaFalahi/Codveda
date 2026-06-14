import React from 'react';

const ProductItem = ({ product, onEdit, onDelete, isAdmin }) => (
  <div className="product-item">
    <h3>{product.name}</h3>
    {product.description && <p>{product.description}</p>}
    <p className="price">${product.price.toFixed(2)}</p>
    <p className="quantity">Quantity: {product.quantity}</p>
    {isAdmin && (
      <div className="product-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>
    )}
  </div>
);

export default ProductItem;