import React, { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import { useChat } from '../context/ChatContext';
import { MessageSquareText } from 'lucide-react';

const ChatbotContainer: React.FC = () => {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between bg-blue-600 text-white p-4">
        <div className="flex items-center">
          <MessageSquareText className="mr-2" size={24} />
          <h2 className="text-xl font-semibold">Digital Literacy Assistant</h2>
        </div>
        <div className="text-xs bg-blue-500 px-2 py-1 rounded-full">
          {isLoading ? 'Typing...' : 'Online'}
        </div>
      </div>
      
      <div className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white">
          <MessageList messages={messages} isLoading={isLoading} />
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200">
          <SuggestedQuestions />
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default ChatbotContainer;