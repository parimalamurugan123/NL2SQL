import React from 'react';
import { Code, CopyIcon, Check } from 'lucide-react';

interface SQLResultProps {
  sql: string | null;
}

const SQLResult: React.FC<SQLResultProps> = ({ sql }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (sql) {
      navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!sql) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Code className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Generated SQL Query</h2>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-blue-600 focus:outline-none transition-colors"
          aria-label="Copy SQL"
          title="Copy SQL"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <CopyIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">{sql}</pre>
      </div>
    </div>
  );
};

export default SQLResult;