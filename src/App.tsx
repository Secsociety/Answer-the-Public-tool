import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { TreeMap } from './components/TreeMap';
import { QuestionList } from './components/QuestionList';
import { generateQuestions } from './utils/questionGenerator';
import { generateTreeData } from './utils/treeDataGenerator';
import { Question, TreeNode } from './types';

function App() {
  const [keyword, setKeyword] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  const handleSearch = () => {
    if (keyword.trim()) {
      const generatedQuestions = generateQuestions(keyword);
      setQuestions(generatedQuestions);
      setTreeData(generateTreeData(keyword, generatedQuestions));
      setSelectedCategory('All');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Enhanced Answer The Public
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
          />
        </div>

        {questions.length > 0 && treeData && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Question Tree</h2>
              <TreeMap data={treeData} keyword={keyword} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Question List</h2>
              <QuestionList
                questions={questions}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;