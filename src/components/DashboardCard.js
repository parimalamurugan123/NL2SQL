// src/components/DashboardCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import ChartRenderer from './ChartRenderer';

const DashboardCard = ({ result, question }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm border border-blue-50"
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-4 border-b border-blue-50">
        <h3 className="text-sm font-semibold text-blue-600">{question}</h3>
        <p className="text-xs text-blue-400 mt-1 font-mono">{result.sql}</p>
      </div>
      
      <div className="h-48 p-4">
        <ChartRenderer
          chartType={result.chartType}
          data={result.data}
          columns={result.columns}
        />
      </div>
      
      <div className="p-4 bg-blue-50">
        <button className="text-xs text-blue-600 hover:text-blue-800">
          <span>🔍 Explore Data</span>
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
