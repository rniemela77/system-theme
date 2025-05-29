import React from 'react';

interface FileIconProps {
  type: 'drawing' | 'text';
}

export const FileIcon: React.FC<FileIconProps> = ({ type }) => {
  if (type === 'text') {
    return (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        style={{ marginRight: '8px' }}
      >
        <path 
          d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2H3ZM4 4H12V5H4V4ZM4 7H12V8H4V7ZM4 10H8V11H4V10Z" 
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      style={{ marginRight: '8px' }}
    >
      <path 
        d="M14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H3.5C2.67157 14 2 13.3284 2 12.5V3.5C2 2.67157 2.67157 2 3.5 2H12.5C13.3284 2 14 2.67157 14 3.5ZM4 11L6.5 8.5L8 10L10.5 7.5L12 9V4H4V11Z" 
        fill="currentColor"
      />
    </svg>
  );
}; 