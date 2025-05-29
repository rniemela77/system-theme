import type { File } from '../types/file';

const STORAGE_KEY = 'editor-files';

export const loadFiles = (): File[] => {
  const storedFiles = localStorage.getItem(STORAGE_KEY);
  if (!storedFiles) {
    // Return default files if nothing is stored
    return [
      { 
        name: 'example.txt',
        content: 'This is an example file.',
        type: 'text'
      },
      { 
        name: 'todo.txt',
        content: '1. Create file system\n2. Add more features',
        type: 'text'
      },
      { 
        name: 'drawing1.png', 
        content: '', 
        type: 'drawing'
      },
      { 
        name: 'drawing2.png', 
        content: '',
        type: 'drawing'
      }
    ];
  }

  return JSON.parse(storedFiles);
};

export const saveFiles = (files: File[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}; 