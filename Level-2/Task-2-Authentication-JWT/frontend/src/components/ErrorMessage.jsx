import React from 'react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="error">
    <p>{message}</p>
    {onRetry && (
      <button className="btn btn-secondary" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

export default ErrorMessage;