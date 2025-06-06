import React from 'react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
      style={{
        animationDelay: '0.1s',
        animationDuration: '0.3s',
      }}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl py-2 px-4 ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-none'
            : message.isError
              ? 'bg-red-100 text-red-800 rounded-tl-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <div className="markdown-content">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-200' : 'text-gray-500'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;