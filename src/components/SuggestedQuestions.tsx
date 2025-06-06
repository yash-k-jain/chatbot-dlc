import React from 'react';
import { useChat } from '../context/ChatContext';

const SuggestedQuestions: React.FC = () => {
  const { suggestedQuestions, sendMessage } = useChat();

  return (
    <div className="p-3 border-b border-gray-200 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested Questions:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question) => (
          <button
            key={question.id}
            onClick={() => sendMessage(question.text)}
            className="bg-white text-blue-600 text-sm border border-blue-300 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;