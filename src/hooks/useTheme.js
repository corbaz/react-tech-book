import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 1. Revisar si ya hay algo guardado
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme;
      }
    }
    // 2. Si no, default a light (ignorando preferencia de sistema por petición)
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remover la clase anterior para evitar conflictos
    root.classList.remove("light", "dark");

    // Agregar la clase actual
    root.classList.add(theme);

    // Guardar en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
