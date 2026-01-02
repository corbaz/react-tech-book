import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const InstallCommand = ({ cmd }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div 
      className="bg-gray-900 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-colors"
      onClick={handleCopy}
    >
      <code className="text-gray-100 font-mono text-sm overflow-x-auto whitespace-nowrap mr-4 no-scrollbar">
        {cmd}
      </code>
      <button 
        className="text-gray-400 hover:text-white transition-colors p-1"
        title="Copiar comando"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
};
