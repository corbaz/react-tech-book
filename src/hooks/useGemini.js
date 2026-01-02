import { useState, useCallback } from 'react';
import { GeminiService } from '../services/ai.service';

/**
 * Custom hook to manage Gemini AI interactions
 * @returns {Object} - { result, loading, error, generate }
 */
export const useGemini = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const text = await GeminiService.generateContent(prompt, apiKey);
      setResult(text);
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al consultar a la IA.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, generate, setResult, setError };
};
