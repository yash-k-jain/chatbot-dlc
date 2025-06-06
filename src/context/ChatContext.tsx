import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, SuggestedQuestion } from '../types';
import { suggestedQuestions } from '../data/suggestedQuestions';
import { getFAQResponse } from '../utils/faqHandler';
import { sendMessageToChatGPT } from '../utils/openaiService';

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: (content: string) => Promise<void>;
  suggestedQuestions: SuggestedQuestion[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Digital Literacy Assistant. How can I help you learn about digital tools like WhatsApp, Paytm, or Google Maps today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Check if we have a predefined FAQ answer
      const faqResponse = getFAQResponse(content);
      
      if (faqResponse) {
        // Use FAQ response
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: faqResponse,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsLoading(false);
        }, 1000); // Simulate network delay
      } else {
        // Use ChatGPT API
        const aiResponse = await sendMessageToChatGPT(content, messages);
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botResponse]);
      }
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        inputValue,
        setInputValue,
        sendMessage,
        suggestedQuestions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};