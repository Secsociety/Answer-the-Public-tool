export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: string;
}

export type QuestionType = 
  | 'what'
  | 'why'
  | 'how'
  | 'when'
  | 'where'
  | 'who'
  | 'which'
  | 'comparison'
  | 'preposition';

export interface TreeNode {
  name: string;
  category: string;
  children?: TreeNode[];
}