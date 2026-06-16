import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductItem from '../components/ProductItem';
import { useSocket } from '../context/SocketContext';
import { onEvent, offEvent } from '../services/socket';

const HomePage = () => {
  const { products, pagination, loading, error, nextPage, prevPage } = useProducts();
  const { connected, socketId } = useSocket();
  const [socketEvent, setSocketEvent] = useState(null);

  useEffect(() => {
    const handleTestEvent = (data) => {
      setSocketEvent(data);
    };

    onEvent('test-event', handleTestEvent);

    return () => {
      offEvent('test-event', handleTestEvent);
    };
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Products Catalog</h1>
        <p>Discover amazing products curated just for you</p>
        
        <div className="socket-status">
          <span className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}></span>
          <span>Real-time: {connected ? `Connected (${socketId})` : 'Disconnected'}</span>
        </div>
        
        {socketEvent && (
          <div className="socket-event">
            <strong>Socket Event Received:</strong> {JSON.stringify(socketEvent)}
          </div>
        )}
      </section>

      <section className="products-section">
        {loading && <div className="loading">Loading products...</div>}
        {error && <div className="error-message">{error}</div>}
        
        <div className="products-grid">
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

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

        {products.length === 0 && !loading && (
          <div className="no-products">
            <p>No products available yet.</p>
            <Link to="/admin-dashboard" className="btn btn-primary">Add First Product</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;