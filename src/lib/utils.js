import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases CSS condicionalmente y resuelve conflictos de Tailwind
 * @param {...any} inputs - Clases a combinar
 * @returns {string} - Cadena de clases resultante
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
