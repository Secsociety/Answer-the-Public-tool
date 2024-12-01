import { Question, QuestionType } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateQuestions = (keyword: string): Question[] => {
  const questions: Question[] = [];
  
  // What questions
  const whatQuestions = [
    `What is ${keyword}?`,
    `What are the benefits of ${keyword}?`,
    `What makes ${keyword} unique?`,
    `What are the types of ${keyword}?`,
    `What does ${keyword} mean?`
  ];

  // Why questions
  const whyQuestions = [
    `Why use ${keyword}?`,
    `Why is ${keyword} important?`,
    `Why choose ${keyword}?`,
    `Why does ${keyword} matter?`,
    `Why learn about ${keyword}?`
  ];

  // How questions
  const howQuestions = [
    `How does ${keyword} work?`,
    `How to use ${keyword}?`,
    `How to get started with ${keyword}?`,
    `How much does ${keyword} cost?`,
    `How to learn ${keyword}?`
  ];

  // When questions
  const whenQuestions = [
    `When to use ${keyword}?`,
    `When was ${keyword} invented?`,
    `When is ${keyword} necessary?`,
    `When did ${keyword} become popular?`,
    `When should I consider ${keyword}?`
  ];

  // Where questions
  const whereQuestions = [
    `Where to find ${keyword}?`,
    `Where is ${keyword} used?`,
    `Where to learn ${keyword}?`,
    `Where to buy ${keyword}?`,
    `Where did ${keyword} originate?`
  ];

  // Who questions
  const whoQuestions = [
    `Who uses ${keyword}?`,
    `Who invented ${keyword}?`,
    `Who needs ${keyword}?`,
    `Who benefits from ${keyword}?`,
    `Who teaches ${keyword}?`
  ];

  // Comparison questions
  const comparisonQuestions = [
    `${keyword} vs alternative`,
    `${keyword} compared to competitors`,
    `${keyword} or similar options`,
    `${keyword} alternatives`,
    `Best ${keyword} options`
  ];

  // Preposition questions
  const prepositionQuestions = [
    `for ${keyword}`,
    `with ${keyword}`,
    `without ${keyword}`,
    `about ${keyword}`,
    `through ${keyword}`
  ];

  const addQuestions = (questionList: string[], type: QuestionType, category: string) => {
    questionList.forEach(q => {
      questions.push({
        id: generateId(),
        text: q,
        type,
        category
      });
    });
  };

  addQuestions(whatQuestions, 'what', 'Information');
  addQuestions(whyQuestions, 'why', 'Reasoning');
  addQuestions(howQuestions, 'how', 'Process');
  addQuestions(whenQuestions, 'when', 'Timing');
  addQuestions(whereQuestions, 'where', 'Location');
  addQuestions(whoQuestions, 'who', 'People');
  addQuestions(comparisonQuestions, 'comparison', 'Alternatives');
  addQuestions(prepositionQuestions, 'preposition', 'Context');

  return questions;
};