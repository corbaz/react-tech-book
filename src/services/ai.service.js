/**
 * Service to interact with Google Gemini API
 */
export class GeminiService {
  static API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

  /**
   * Generate content based on a prompt
   * @param {string} prompt - The user prompt
   * @param {string} apiKey - The API key
   * @returns {Promise<string>} - The generated text
   */
  static async generateContent(prompt, apiKey) {
    if (!apiKey) {
      throw new Error('API Key no configurada. Define VITE_GEMINI_API_KEY en tu archivo .env');
    }

    try {
      const response = await fetch(`${this.API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No se recibió respuesta de la IA.');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}
