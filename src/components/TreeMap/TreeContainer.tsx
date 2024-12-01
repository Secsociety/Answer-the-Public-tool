import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeNode as TreeNodeComponent } from './TreeNode';
import { TreeLink } from './TreeLink';
import { ExportButton } from './ExportButton';
import { TreeNode } from '../../types';
import { useTreeDimensions } from '../../hooks/useTreeDimensions';

interface TreeContainerProps {
  data: TreeNode;
  keyword: string;
}

export const TreeContainer: React.FC<TreeContainerProps> = ({ data, keyword }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useTreeDimensions();

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${dimensions.margin.left},${dimensions.margin.top})`);

    const tree = d3.tree<TreeNode>().size([
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
      dimensions.width - dimensions.margin.left - dimensions.margin.right,
    ]);

    const root = d3.hierarchy(data);
    const treeData = tree(root);

    // Add links
    g.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append(g => {
        const link = document.createElementNS(d3.namespaceString, 'g');
        ReactDOM.render(
          <TreeLink source={g.source} target={g.target} />,
          link
        );
        return link;
      });

    // Add nodes
    g.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append(g => {
        const node = document.createElementNS(d3.namespaceString, 'g');
        ReactDOM.render(
          <TreeNodeComponent x={g.x} y={g.y} data={g.data} />,
          node
        );
        return node;
      });
  }, [data, dimensions]);

  return (
    <div className="relative w-full overflow-x-auto" id="tree-container">
      <svg ref={svgRef} className="w-full"></svg>
      <ExportButton keyword={keyword} />
    </div>
  );
};