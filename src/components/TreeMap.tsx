import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../types';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';

interface TreeMapProps {
  data: TreeNode;
  keyword: string;
}

export const TreeMap: React.FC<TreeMapProps> = ({ data, keyword }) => {
  const svgRef = useRef<SVGSVGElement>(null);

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

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 1200;
    const height = 800;
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tree = d3.tree<TreeNode>().size([
      height - margin.top - margin.bottom,
      width - margin.left - margin.right,
    ]);

    const root = d3.hierarchy(data);
    const treeData = tree(root);

    // Add links
    const link = g
      .selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 2)
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
      );

    // Add nodes
    const node = g
      .selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Add circles for nodes
    node
      .append('circle')
      .attr('r', 8)
      .attr('fill', d => getNodeColor(d.data.category));

    // Add labels
    node
      .append('text')
      .attr('dy', '.31em')
      .attr('x', d => (d.children ? -12 : 12))
      .attr('text-anchor', d => (d.children ? 'end' : 'start'))
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', '#1f2937');
  }, [data]);

  const getNodeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      root: '#2563eb',
      Information: '#ef4444',
      Reasoning: '#f59e0b',
      Process: '#10b981',
      Timing: '#6366f1',
      Location: '#8b5cf6',
      People: '#ec4899',
      Alternatives: '#14b8a6',
      Context: '#f97316'
    };
    return colors[category] || '#94a3b8';
  };

  return (
    <div className="relative w-full overflow-x-auto" id="tree-container">
      <svg ref={svgRef} className="w-full"></svg>
      <button
        onClick={exportTree}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Export as PNG
      </button>
    </div>
  );
};