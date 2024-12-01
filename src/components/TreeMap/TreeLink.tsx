import React from 'react';
import * as d3 from 'd3';

interface TreeLinkProps {
  source: { x: number; y: number };
  target: { x: number; y: number };
}

export const TreeLink: React.FC<TreeLinkProps> = ({ source, target }) => {
  const linkGenerator = d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x);

  return (
    <path
      className="link"
      fill="none"
      stroke="#cbd5e1"
      strokeWidth={2}
      d={linkGenerator({ source, target }) || undefined}
    />
  );
};