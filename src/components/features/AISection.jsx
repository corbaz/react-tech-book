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
import { useGemini } from "../../hooks/useGemini";

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
    
    Responde de forma concisa, técnica y útil para un desarrollador React.`;

    generateResponse(fullPrompt);
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(result);
        setCopied(true);
      } else {
        // Alternativa (Fallback)
        const textArea = document.createElement("textarea");
        textArea.value = result;
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

  const suggestions = [
    `¿Cuándo usar ${selectedTech.name}?`,
    `Ventajas de ${selectedTech.name}`,
    `Ejemplo de código con ${selectedTech.name}`,
  ];

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <Sparkles size={20} />
        <h3 className="font-semibold text-lg">Asistente AI</h3>
      </div>

      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
        {/* Encabezado: Icono + Texto en línea para ahorrar espacio vertical */}
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
          <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative group">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                Analizando documentación...
              </div>
            ) : error ? (
              <div className="text-sm text-red-500">Error: {error}</div>
            ) : (
              <>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Copiar respuesta"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <div className="prose prose-sm max-w-none text-gray-700 pr-8">
                  {result.split("\n").map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
                {/* Botón de Copiar Inferior */}
                <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copiar respuesta"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-500" />
                        <span className="text-green-600">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copiar respuesta</span>
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
            className="w-full pl-4 pr-24 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {prompt && (
              <button
                type="button"
                onClick={() => setPrompt("")}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Borrar texto"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
