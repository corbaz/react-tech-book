import { useState, useMemo } from "react";
import { technologies } from "../data/technologies";

/**
 * Hook personalizado para gestionar la selección y filtrado de tecnologías
 * @returns {Object} - Estado y manejadores para selección de tecnologías
 */
export const useTechSelection = () => {
  const [selectedId, setSelectedId] = useState(() => {
    if (technologies.length > 0) {
      const randomIndex = Math.floor(Math.random() * technologies.length);
      return technologies[randomIndex].id;
    }
    return null;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derivar categorías de los datos
  const categories = useMemo(() => {
    // Obtenemos las categorías únicas de todas las tecnologías
    const cats = ["Todos", ...new Set(technologies.map((t) => t.category))];
    return cats;
  }, []);

  // Filtrar ítems
  const filteredItems = useMemo(() => {
    return technologies.filter((item) => {
      // Normalizamos el término de búsqueda
      const term = searchTerm.toLowerCase().trim();

      // Búsqueda precisa: Solo en Nombre para evitar coincidencias indirectas por tags
      const matchesSearch = item.name.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "Todos" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const activeItem = useMemo(
    () => technologies.find((t) => t.id === selectedId) || null,
    [selectedId],
  );

  return {
    selectedId,
    setSelectedId,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    isSidebarOpen,
    setIsSidebarOpen,
    categories,
    filteredItems,
    activeItem,
  };
};
