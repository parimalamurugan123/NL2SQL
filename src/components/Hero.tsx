import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const letters = "NL2SQL".split('');
  
  return (
    <section className="bg-gradient-to-r from-sky-100 to-sky-200 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6 overflow-hidden">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}
                className="text-6xl md:text-7xl font-extrabold text-sky-800 mx-1"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-xl leading-8 text-sky-900"
          >
            This project translates natural language questions into SQL queries and visualizes the results with intelligent chart suggestions.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;