import React from 'react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';

interface ExportButtonProps {
  keyword: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ keyword }) => {
  const exportTree = async () => {
    const treeElement = document.getElementById('tree-container');
    if (treeElement) {
      try {
        const dataUrl = await htmlToImage.toPng(treeElement);
        saveAs(dataUrl, `${keyword}-question-tree.png`);
      } catch (error) {
        console.error('Error exporting tree:', error);
      }
    }
  };

  return (
    <button
      onClick={exportTree}
      className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
    >
      Export as PNG
    </button>
  );
};