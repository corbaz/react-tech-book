import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function InstallCommand({ command }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = command;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Fallback: Oops, unable to copy", err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="bg-gray-900 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-colors relative"
      onClick={copyToClipboard}
      title="Click para copiar"
    >
      <code className="text-gray-100 font-mono text-sm overflow-x-auto whitespace-nowrap mr-4 no-scrollbar select-all">
        {command}
      </code>
      <button
        type="button"
        className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
        aria-label="Copiar comando"
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
    </div>
  );
}
