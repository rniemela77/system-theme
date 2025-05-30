import React, { useState } from 'react';
import { FileIcon } from './FileIcon';
import type { File } from '../types/file';

interface SidebarProps {
  files: File[];
  selectedFileName: string;
  onFileSelect: (fileName: string) => void;
  onFilesReorder: (files: File[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  files,
  selectedFileName,
  onFileSelect,
  onFilesReorder
}) => {
  const [draggedFile, setDraggedFile] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, fileName: string) => {
    setDraggedFile(fileName);
    e.dataTransfer.effectAllowed = 'move';
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedFile(null);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetFileName: string) => {
    e.preventDefault();
    if (!draggedFile || draggedFile === targetFileName) return;

    const newFiles = [...files];
    const draggedIndex = newFiles.findIndex(f => f.name === draggedFile);
    const targetIndex = newFiles.findIndex(f => f.name === targetFileName);
    
    const [draggedItem] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(targetIndex, 0, draggedItem);
    
    onFilesReorder(newFiles);
  };

  return (
    <div style={{
      width: '200px',
      borderRight: '1px solid #ccc',
      color: 'black',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '0.5rem' }}>
        {files.map(file => (
          <div
            key={file.name}
            draggable
            onDragStart={(e) => handleDragStart(e, file.name)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, file.name)}
            style={{
              padding: '0.5rem 0.75rem',
              cursor: 'grab',
              backgroundColor: file.name === selectedFileName ? '#FFFFFF' : 'transparent',
              borderRadius: '4px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
              transition: 'transform 0.1s ease',
              ...(draggedFile && draggedFile !== file.name ? {
                transform: 'scale(1.02)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              } : {})
            }}
            onClick={() => onFileSelect(file.name)}
          >
            <FileIcon type={file.type} />
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}; 