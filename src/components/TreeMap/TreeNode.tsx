import React from 'react';
import { getNodeColor } from '../../utils/colorUtils';

interface TreeNodeProps {
  x: number;
  y: number;
  data: {
    name: string;
    category: string;
    children?: any[];
  };
}

export const TreeNode: React.FC<TreeNodeProps> = ({ x, y, data }) => {
  return (
    <g transform={`translate(${y},${x})`}>
      <circle
        r={8}
        fill={getNodeColor(data.category)}
      />
      <text
        dy=".31em"
        x={data.children ? -12 : 12}
        textAnchor={data.children ? 'end' : 'start'}
        fontSize="12px"
        fill="#1f2937"
      >
        {data.name}
      </text>
    </g>
  );
};