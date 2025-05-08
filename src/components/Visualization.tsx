import React from 'react';
import { BarChart, LineChart, PieChart, BarChart3 } from 'lucide-react';

interface VisualizationProps {
  isVisible: boolean;
}

const Visualization: React.FC<VisualizationProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Results Visualization</h2>
      
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-700">Bar Chart</h3>
            <BarChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
            <div className="flex items-end space-x-2 h-32">
              <div className="w-8 bg-blue-600 h-20 rounded-t-md"></div>
              <div className="w-8 bg-blue-500 h-24 rounded-t-md"></div>
              <div className="w-8 bg-blue-400 h-32 rounded-t-md"></div>
              <div className="w-8 bg-blue-500 h-16 rounded-t-md"></div>
              <div className="w-8 bg-blue-600 h-28 rounded-t-md"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Recommended for comparing discrete categories</p>
        </div>
        
        <div className="flex-1 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-700">Line Chart</h3>
            <LineChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
            <svg className="w-full h-32" viewBox="0 0 100 50">
              <path 
                d="M0,40 Q20,35 30,30 T50,20 T70,25 T100,10" 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="2"
              />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-2">Best for showing trends over time</p>
        </div>
        
        <div className="flex-1 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-700">Pie Chart</h3>
            <PieChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="white" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ddd" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="188.4" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#93C5FD" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="125.6" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-2">Ideal for showing proportions of a whole</p>
        </div>
      </div>
    </div>
  );
};

export default Visualization;