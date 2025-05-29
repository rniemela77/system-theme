import React from 'react';

interface TextEditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({ content, onContentChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        padding: '1rem',
        resize: 'none',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        backgroundColor: '#f0f0f0',
        color: '#362E2E',
        outline: 'none'
      }}
    />
  );
}; 