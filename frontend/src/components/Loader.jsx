import React from 'react';
import '../styles/Loader.css';

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loader-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="loader-inline">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
