import React, { useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { GraphData } from '../types';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

interface QuestionGraphProps {
  data: GraphData;
  keyword: string;
}

export const QuestionGraph: React.FC<QuestionGraphProps> = ({ data, keyword }) => {
  const graphRef = useRef<any>();

  const getNodeColor = (node: any) => {
    const colors: { [key: string]: string } = {
      center: '#2563eb',
      Information: '#ef4444',
      Reasoning: '#f59e0b',
      Process: '#10b981',
      Timing: '#6366f1',
      Location: '#8b5cf6',
      People: '#ec4899',
      Alternatives: '#14b8a6',
      Context: '#f97316'
    };
    return colors[node.category] || '#94a3b8';
  };

  const exportGraph = async () => {
    const graphElement = document.getElementById('graph-container');
    if (graphElement) {
      try {
        const dataUrl = await htmlToImage.toPng(graphElement);
        saveAs(dataUrl, `${keyword}-questions-map.png`);
      } catch (error) {
        console.error('Error exporting graph:', error);
      }
    }
  };

  return (
    <div className="relative w-full h-[800px]" id="graph-container">
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeLabel="name"
        nodeColor={getNodeColor}
        nodeRelSize={6}
        linkColor={() => '#cbd5e1'}
        linkWidth={2}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = node.category === 'center' ? 16 : 12;
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = getNodeColor(node);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          if (globalScale >= 1) {
            ctx.fillText(label, node.x, node.y);
          }
        }}
      />
      <button
        onClick={exportGraph}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Export as PNG
      </button>
    </div>
  );
};