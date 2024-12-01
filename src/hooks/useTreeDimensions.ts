import { useMemo } from 'react';

interface TreeDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const useTreeDimensions = (): TreeDimensions => {
  return useMemo(() => ({
    width: 1200,
    height: 800,
    margin: {
      top: 20,
      right: 90,
      bottom: 30,
      left: 90,
    },
  }), []);
};