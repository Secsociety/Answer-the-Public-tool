import { Question, TreeNode } from '../types';

export const generateTreeData = (keyword: string, questions: Question[]): TreeNode => {
  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as { [key: string]: Question[] });

  // Create tree structure
  const treeData: TreeNode = {
    name: keyword,
    category: 'root',
    children: Object.entries(questionsByCategory).map(([category, questions]) => ({
      name: category,
      category,
      children: questions.map(q => ({
        name: q.text,
        category: q.category
      }))
    }))
  };

  return treeData;
};