import { useState, useMemo } from 'react';
import { technologies } from '../data/technologies';

/**
 * Custom hook to manage technology selection and filtering
 * @returns {Object} - State and handlers for tech selection
 */
export const useTechSelection = () => {
  const [selectedId, setSelectedId] = useState(() => {
    if (technologies.length > 0) {
      const randomIndex = Math.floor(Math.random() * technologies.length);
      return technologies[randomIndex].id;
    }
    return null;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derive categories from data
  const categories = useMemo(() => {
    const cats = ['Todos', ...new Set(technologies.map(t => t.category))];
    return cats;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return technologies.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const activeItem = useMemo(() => 
    technologies.find(t => t.id === selectedId) || null, 
  [selectedId]);

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
    activeItem
  };
};
