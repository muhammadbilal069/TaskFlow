
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Oops! The page you're looking for doesn't exist
        or has been moved.
      </p>

      <Link to="/" className="not-found__btn">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
