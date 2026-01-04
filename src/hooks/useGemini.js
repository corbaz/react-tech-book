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
      // 1. Intentar obtener del localStorage (producción/usuario)
      let apiKey = localStorage.getItem("gemini_api_key");

      // 2. Si no hay en storage y estamos en DEV, intentar del .env
      // En build de producción, import.meta.env.DEV es false, así que esta rama se elimina
      // y no se expone la key del .env local en el bundle.
      if (!apiKey && import.meta.env.DEV) {
        apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      }

      if (!apiKey) {
        throw new Error("MISSING_API_KEY");
      }

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
