import React from 'react';
import { Question } from '../types';

interface QuestionListProps {
  questions: Question[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = Array.from(new Set(questions.map(q => q.category)));

  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map(question => (
          <div
            key={question.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-800">{question.text}</p>
            <span className="inline-block mt-2 text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">
              {question.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};