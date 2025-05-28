import React from 'react';

const BottomBar: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <span>bottom-bar</span>
    </div>
  );
};

export default BottomBar; 