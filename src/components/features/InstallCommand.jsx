import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

export function InstallCommand({ command }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("npm");

  const commands = useMemo(() => {
    if (!command) return { npm: "" };

    const cleanCommand = command.trim();

    // Si no es un comando npm/npx estándar, devolvemos solo el original
    if (!cleanCommand.startsWith("npm")) {
      return { npm: cleanCommand };
    }

    let pnpm = cleanCommand;
    let yarn = cleanCommand;
    let bun = cleanCommand;

    // Manejo de 'npm install' o 'npm i'
    if (
      cleanCommand.startsWith("npm install") ||
      cleanCommand.startsWith("npm i ")
    ) {
      const args = cleanCommand.replace(/^npm (install|i)/, "").trim();

      // Reemplazo básico para pnpm y yarn
      pnpm = `pnpm add ${args}`;
      yarn = `yarn add ${args}`;

      // Para Bun, convertimos -D a -d si está presente, aunque -D suele funcionar
      bun = `bun add ${args}`;
    }
    // Manejo de 'npx'
    else if (cleanCommand.startsWith("npx")) {
      const args = cleanCommand.replace(/^npx/, "").trim();
      pnpm = `pnpm dlx ${args}`;
      yarn = `yarn dlx ${args}`;
      bun = `bunx ${args}`;
    }
    // Manejo de 'npm create'
    else if (cleanCommand.startsWith("npm create")) {
      const args = cleanCommand.replace(/^npm create/, "").trim();
      pnpm = `pnpm create ${args}`;
      yarn = `yarn create ${args}`;
      bun = `bun create ${args}`;
    }

    return {
      npm: cleanCommand,
      pnpm,
      yarn,
      bun,
    };
  }, [command]);

  const currentCommand = commands[activeTab] || command;
  const isMultiTab = Object.keys(commands).length > 1;

  const copyToClipboard = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentCommand;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full">
      {isMultiTab && (
        <div className="flex items-center gap-1 mb-2">
          {Object.keys(commands).map((pkgManager) => (
            <button
              key={pkgManager}
              onClick={() => setActiveTab(pkgManager)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === pkgManager
                  ? "bg-blue-100 text-blue-700 shadow-sm ring-1 ring-blue-200"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {pkgManager}
            </button>
          ))}
        </div>
      )}

      <div
        className="bg-gray-900 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-colors relative shadow-sm"
        onClick={copyToClipboard}
        title="Click para copiar"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="text-gray-500 select-none text-xs font-mono">$</span>
          <code className="text-gray-100 font-mono text-sm overflow-x-auto whitespace-nowrap no-scrollbar select-all">
            {currentCommand}
          </code>
        </div>
        <button
          type="button"
          className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-700 flex-shrink-0 ml-2"
          aria-label="Copiar comando"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
