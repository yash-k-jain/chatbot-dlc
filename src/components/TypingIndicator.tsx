import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-2 px-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;