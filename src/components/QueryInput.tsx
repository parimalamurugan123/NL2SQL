import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const QueryInput: React.FC<{
  onSubmit: (queries: string[]) => void;
}> = ({ onSubmit }) => {
  const [queries, setQueries] = useState(['', '', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validQueries = queries.filter(q => q.trim());
    if (validQueries.length > 0) {
      onSubmit(validQueries);
    }
  };
  

  const handleQueryChange = (index: number, value: string) => {
    const newQueries = [...queries];
    newQueries[index] = value;
    setQueries(newQueries);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg rounded-2xl p-8"
    >
      <motion.div 
        className="flex items-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Sparkles className="h-6 w-6 text-sky-500 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">AI-Powered SQL Generation</h2>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {queries.map((query, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <textarea
              value={query}
              onChange={(e) => handleQueryChange(index, e.target.value)}
              placeholder={`Enter your question ${index + 1}`}
              className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 resize-none h-16"
            />
          </motion.div>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>Generate Dashboard</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default QueryInput;