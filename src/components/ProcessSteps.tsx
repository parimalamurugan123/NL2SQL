import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Database, BarChart3 } from 'lucide-react';

interface ProcessStepsProps {
  currentStep: number;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ currentStep }) => {
  const steps = [
    { 
      icon: <MessageSquare className="h-6 w-6" />, 
      title: 'Natural Language Input', 
      description: 'Ask your question in plain English' 
    },
    { 
      icon: <Database className="h-6 w-6" />, 
      title: 'SQL Generation', 
      description: 'AI translates to database query' 
    },
    { 
      icon: <BarChart3 className="h-6 w-6" />, 
      title: 'Visualization', 
      description: 'Results displayed with suggested charts' 
    }
  ];

  return (
    <motion.div 
      className="py-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-row justify-between items-center mb-8 overflow-x-auto"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex-1 flex flex-col items-center text-center px-4"
              initial={{ x: -50 * index }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full mb-4
                  ${index < currentStep ? 'bg-green-100 text-green-600' : 
                    index === currentStep ? 'bg-blue-100 text-blue-600' : 
                    'bg-gray-100 text-gray-400'}
                  ${index < currentStep && 'ring-2 ring-green-500 ring-offset-2'}
                  ${index === currentStep && 'ring-2 ring-blue-500 ring-offset-2'}
                `}
                whileHover={{ scale: 1.1 }}
              >
                {step.icon}
              </motion.div>
              <h3 className={`font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProcessSteps;