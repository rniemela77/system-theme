import React from 'react';

const Window: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      margin: '20px',
      minHeight: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>child window</h2>
    </div>
  );
};

export default Window; 