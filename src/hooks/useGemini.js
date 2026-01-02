import { useState, useCallback } from "react";
import { GeminiService } from "../services/ai.service";

/**
 * Hook personalizado para gestionar interacciones con Gemini AI
 * @returns {Object} - { result, loading, error, generate }
 */
export const useGemini = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResponse = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);
    setResult("");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const text = await GeminiService.generateContent(prompt, apiKey);
      setResult(text);
    } catch (err) {
      setError(
        err.message || "Ocurrió un error inesperado al consultar a la IA.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, generateResponse, setResult, setError };
};
