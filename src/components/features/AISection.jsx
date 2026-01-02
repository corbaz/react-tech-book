import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Send, Lightbulb } from 'lucide-react';
import { useGemini } from '../../hooks/useGemini';

export const AISection = ({ activeItem }) => {
  const [prompt, setPrompt] = useState('');
  const { result, loading, error, generate, setResult, setError } = useGemini();

  // Reset AI state when technology changes
  useEffect(() => {
    setPrompt('');
    setResult('');
    setError(null);
  }, [activeItem.id, setResult, setError]);

  const handleConsult = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Enrich prompt with context
    const fullPrompt = `Contexto: Estoy analizando la tecnología "${activeItem.name}" (${activeItem.category}). 
    Descripción: ${activeItem.description}.
    
    Pregunta del usuario: ${prompt}
    
    Responde de forma concisa, técnica y útil para un desarrollador React.`;
    
    generate(fullPrompt);
  };

  const suggestions = [
    `¿Cuándo usar ${activeItem.name}?`,
    `Ventajas de ${activeItem.name}`,
    `Ejemplo de código con ${activeItem.name}`
  ];

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <Sparkles size={20} />
        <h3 className="font-semibold text-lg">Asistente AI</h3>
      </div>

      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
        {/* Header: Icon + Text inline to save vertical space */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <Bot size={18} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-700">
            ¿Tienes dudas sobre <strong>{activeItem.name}</strong>? Pregúntame o elige una sugerencia.
          </p>
        </div>
        
        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => { setPrompt(sug); generate(sug); }}
              className="text-xs bg-white text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 hover:border-blue-300 transition-colors flex items-center gap-1.5"
            >
              <Lightbulb size={12} />
              {sug}
            </button>
          ))}
        </div>

        {/* Response Area - Full Width */}
        {(loading || result || error) && (
          <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                Analizando documentación...
              </div>
            ) : error ? (
              <div className="text-sm text-red-500">
                Error: {error}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-gray-700">
                {result.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">{line}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input Form - Full Width */}
        <form onSubmit={handleConsult} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Pregunta sobre ${activeItem.name}...`}
            className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
