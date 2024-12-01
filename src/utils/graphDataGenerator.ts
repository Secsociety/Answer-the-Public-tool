import { Question, GraphData } from '../types';

export const generateGraphData = (questions: Question[]): GraphData => {
  const nodes = [
    // Center node
    {
      id: 'center',
      name: 'Main Topic',
      val: 20,
      category: 'center'
    },
    // Category nodes
    ...questions.map(q => ({
      id: q.id,
      name: q.text,
      val: 10,
      category: q.category
    }))
  ];

  const links = questions.map(q => ({
    source: 'center',
    target: q.id
  }));

  return { nodes, links };
};