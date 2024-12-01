import React from 'react';
import { TreeContainer } from './TreeContainer';
import { TreeNode } from '../../types';

interface TreeMapProps {
  data: TreeNode;
  keyword: string;
}

export const TreeMap: React.FC<TreeMapProps> = ({ data, keyword }) => {
  return <TreeContainer data={data} keyword={keyword} />;
};