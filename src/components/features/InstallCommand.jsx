import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const InstallCommand = ({ cmd }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    // Prevent default behavior if needed, though mostly relevant for links/forms
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!cmd) return;

    try {
      // Try Modern Async API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cmd);
        setCopied(true);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      // Fallback for older browsers or non-secure contexts
      try {
        const textArea = document.createElement("textarea");
        textArea.value = cmd;
        
        // Ensure it's not visible but part of DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
        } else {
          console.error('Fallback copy failed');
        }
      } catch (fallbackErr) {
        console.error('Failed to copy', fallbackErr);
      }
    }

    // Reset copied state
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="bg-gray-900 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-colors relative"
      onClick={handleCopy}
      title="Click para copiar"
    >
      <code className="text-gray-100 font-mono text-sm overflow-x-auto whitespace-nowrap mr-4 no-scrollbar select-all">
        {cmd}
      </code>
      <button 
        type="button"
        className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
        aria-label="Copiar comando"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
};
