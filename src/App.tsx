import React from 'react';
import ChatbotContainer from './components/ChatbotContainer';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Digital Literacy Chatbot</h1>
          <p className="text-gray-600">Ask questions about WhatsApp, Paytm, Google Maps and other digital tools</p>
        </header>
        <ChatProvider>
          <ChatbotContainer />
        </ChatProvider>
      </div>
    </div>
  );
}

export default App;