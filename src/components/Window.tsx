import React, { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { TextEditor } from './TextEditor';
import { Sidebar } from './Sidebar';
import { TitleBar } from './TitleBar';
import type { File } from '../types/file';
import { loadFiles, saveFiles } from '../utils/storage';

const Window: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [files, setFiles] = useState<File[]>(() => loadFiles());
  const [selectedFileName, setSelectedFileName] = useState(files[0].name);
  const selectedFile = files.find(f => f.name === selectedFileName)!;

  useEffect(() => {
    saveFiles(files);
  }, [files]);

  const handleWindowMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleWindowMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleWindowMouseUp = () => {
    setIsDragging(false);
  };

  const updateFileContent = (newContent: string) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.name === selectedFileName ? { ...f, content: newContent } : f
      )
    );
  };

  return (
    <div 
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        minWidth: '600px',
        minHeight: '400px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      onMouseMove={handleWindowMouseMove}
      onMouseUp={handleWindowMouseUp}
      onMouseLeave={handleWindowMouseUp}
    >
      <TitleBar 
        title={selectedFile.type === 'drawing' ? 'Drawing Editor' : 'Text Editor'}
        onMouseDown={handleWindowMouseDown}
      />
      <div style={{ 
        display: 'flex',
        flex: 1,
        backgroundColor: '#FFFFFF99',
        backdropFilter: 'blur(20px)',
      }}>
        <Sidebar
          files={files}
          selectedFileName={selectedFileName}
          onFileSelect={setSelectedFileName}
          onFilesReorder={setFiles}
        />
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '1rem'
        }}>
          {selectedFile.type === 'drawing' ? (
            <DrawingCanvas
              content={selectedFile.content}
              onContentChange={updateFileContent}
            />
          ) : (
            <TextEditor
              content={selectedFile.content}
              onContentChange={updateFileContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Window; 