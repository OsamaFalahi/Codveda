import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';

const ProductItem = ({ product }) => (
  <div className="product-card">
    <h3 className="product-name">{product.name}</h3>
    <p className="product-description">{product.description || 'No description available'}</p>
    <div className="product-meta">
      <span className="product-price">${product.price.toFixed(2)}</span>
      <span className="product-quantity">Stock: {product.quantity}</span>
    </div>
    {product.user && (
      <div className="product-owner">By: {product.user.name || product.user.email}</div>
    )}
  </div>
);

export default ProductItem;