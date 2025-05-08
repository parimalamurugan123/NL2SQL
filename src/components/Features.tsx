import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, LineChart, BarChart3, Database } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: 'Instant SQL Translation',
      description: 'Transform natural language questions into optimized SQL queries in seconds'
    },
    {
      icon: <LineChart className="h-6 w-6 text-blue-600" />,
      title: 'Smart Visualizations',
      description: 'Automatically suggests the most appropriate chart type for your data'
    },
    {
      icon: <Database className="h-6 w-6 text-blue-600" />,
      title: 'Multi-Database Support',
      description: 'Works with PostgreSQL, MySQL, SQL Server, and more'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: 'Advanced Analytics',
      description: 'Identify trends and patterns in your data with one simple question'
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: 'Secure & Private',
      description: 'Your data and queries never leave your environment'
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Transform how you interact with your database using our intuitive natural language interface
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;