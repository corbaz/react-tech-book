import { useState } from "react";
import {
  Sparkles,
  Bot,
  Send,
  Lightbulb,
  Copy,
  Check,
  Trash2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGemini } from "../../hooks/useGemini";

// Componente para bloques de código con botón de copiar y estilos mejorados
const CodeBlock = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = String(children).replace(/\n$/, "");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
      } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (inline) {
    return (
      <code
        className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md font-mono text-sm border border-blue-100 align-middle"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900 group">
      <div className="flex items-center justify-between bg-[#1f2937] px-4 py-2.5 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {language || "Terminal"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center gap-1.5"
          title="Copiar código"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-xs font-medium text-green-400">
                Copiado
              </span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span className="text-xs font-medium group-hover:text-white">
                Copiar
              </span>
            </>
          )}
        </button>
      </div>
      <div className="p-5 overflow-x-auto bg-[#0d1117]">
        <code
          className="font-mono text-[13px] sm:text-sm text-gray-300 leading-relaxed block"
          {...props}
        >
          {children}
        </code>
      </div>
    </div>
  );
};

export function AISection({ selectedTech }) {
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const { result, loading, error, generateResponse } = useGemini();

  const handleConsult = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Enriquecer el prompt con contexto
    const fullPrompt = `Contexto: Estoy analizando la tecnología "${selectedTech.name}" (${selectedTech.category}). 
    Descripción: ${selectedTech.description}.
    
    Pregunta del usuario: ${prompt}
    
    Responde de forma concisa, técnica y útil para un desarrollador React. 
    Usa formato Markdown para resaltar código y conceptos clave.`;

    generateResponse(fullPrompt);
  };

  const handleCopyResponse = async () => {
    if (!result) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(result);
        setCopied(true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = result;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const suggestions = [
    `¿Cuándo usar ${selectedTech.name}?`,
    `Ventajas de ${selectedTech.name}`,
    `Ejemplo de código con ${selectedTech.name}`,
  ];

  return (
    <div className="mt-0 border-t-0 pt-0">
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <Sparkles size={20} />
        <h3 className="font-semibold text-lg">Asistente AI</h3>
      </div>

      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
        {/* Encabezado: Icono + Texto en línea */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <Bot size={18} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-700">
            ¿Tienes dudas sobre <strong>{selectedTech.name}</strong>? Pregúntame
            o elige una sugerencia.
          </p>
        </div>

        {/* Sugerencias */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(sug);
                generateResponse(sug);
              }}
              className="text-xs bg-white text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 hover:border-blue-300 transition-colors flex items-center gap-1.5"
            >
              <Lightbulb size={12} />
              {sug}
            </button>
          ))}
        </div>

        {/* Área de Respuesta - Ancho Completo */}
        {(loading || result || error) && (
          <div className="bg-white rounded-xl p-6 border border-blue-100 mb-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative group">
            {loading ? (
              <div className="flex items-center gap-3 text-gray-600 py-8 justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <span className="font-medium">
                  Analizando documentación y generando respuesta...
                </span>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Error: {error}
              </div>
            ) : (
              <>
                <div className="markdown-content text-gray-800 leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      pre: (props) => <>{props.children}</>,
                      code: (props) => <CodeBlock {...props} />,
                      h1: (props) => (
                        <h1
                          className="text-2xl font-bold text-gray-900 mt-6 mb-4 border-b border-gray-100 pb-2"
                          {...props}
                        />
                      ),
                      h2: (props) => (
                        <h2
                          className="text-xl font-bold text-gray-800 mt-6 mb-3"
                          {...props}
                        />
                      ),
                      h3: (props) => (
                        <h3
                          className="text-lg font-semibold text-gray-800 mt-4 mb-2"
                          {...props}
                        />
                      ),
                      p: (props) => (
                        <p
                          className="mb-4 text-base leading-7 text-gray-700"
                          {...props}
                        />
                      ),
                      ul: (props) => (
                        <ul
                          className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-700"
                          {...props}
                        />
                      ),
                      ol: (props) => (
                        <ol
                          className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-700"
                          {...props}
                        />
                      ),
                      li: (props) => <li className="pl-1" {...props} />,
                      a: (props) => (
                        <a
                          className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-200 hover:decoration-blue-800 transition-all"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      blockquote: (props) => (
                        <blockquote
                          className="border-l-4 border-blue-500 pl-4 py-1 my-4 bg-blue-50/50 italic text-gray-700 rounded-r-lg"
                          {...props}
                        />
                      ),
                      table: (props) => (
                        <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
                          <table
                            className="min-w-full divide-y divide-gray-200"
                            {...props}
                          />
                        </div>
                      ),
                      th: (props) => (
                        <th
                          className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...props}
                        />
                      ),
                      td: (props) => (
                        <td
                          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-t border-gray-100"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {result}
                  </ReactMarkdown>
                </div>

                {/* Botón de Copiar Respuesta Completa */}
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleCopyResponse}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                    title="Copiar respuesta completa"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-500" />
                        <span className="text-green-600">
                          Respuesta copiada
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copiar respuesta completa</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Formulario de Entrada - Ancho Completo */}
        <form onSubmit={handleConsult} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Pregunta sobre ${selectedTech.name}...`}
            className="w-full pl-4 pr-24 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-base shadow-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {prompt && (
              <button
                type="button"
                onClick={() => setPrompt("")}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Borrar texto"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
