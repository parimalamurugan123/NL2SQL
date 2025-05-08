// src/components/ChatAssistant.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChatAssistant = ({ onSuggest }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      onSuggest(data.suggestions);
    } catch (err) {
      console.error('Chat error:', err);
    }
    setMessage('');
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4"
      animate={isOpen ? 'open' : 'closed'}
    >
      {isOpen && (
        <motion.div
          className="bg-white shadow-xl rounded-lg w-80"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
        >
          <div className="p-4 border-b border-blue-50">
            <h3 className="text-blue-600 font-semibold">AI Assistant</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your data..."
              className="w-full p-2 border rounded-lg"
            />
          </form>
        </motion.div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? '×' : '🤖'}
      </motion.button>
    </motion.div>
  );
};

export default ChatAssistant;
