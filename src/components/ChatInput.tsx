import React, { FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const ChatInput: React.FC = () => {
  const { inputValue, setInputValue, sendMessage, isLoading } = useChat();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white">
      <div className="relative flex items-center">
        <textarea
          className="flex-1 border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
          placeholder="Ask about digital tools..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`absolute right-3 p-2 rounded-full ${
            isLoading || !inputValue.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          }`}
          disabled={isLoading || !inputValue.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;