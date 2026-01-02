import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, ChevronDown, FolderOpen } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Sidebar = ({ 
  searchTerm, 
  setSearchTerm, 
  categories, 
  filteredItems, 
  selectedId, 
  onSelect,
  isOpen,
  onClose
}) => {
  // State for expanded accordion sections
  // Initialize with all categories open by default or just the first one?
  // Let's default to all open for better discoverability, or maybe just the one with the selected item.
  // Given the user wants to avoid scrolling, maybe collapsed is better?
  // But if I collapse everything, the user sees nothing.
  // Let's start with all Expanded if there are few categories, or just manage it.
  // Actually, let's auto-expand categories that have the selected item.
  
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // Initial state: Expand all categories that contain the selected item (if any)
    // Or just expand all? "Todos" implies showing everything.
    return categories.filter(c => c !== 'Todos');
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups = {};
    // Initialize groups based on available categories (excluding 'Todos')
    categories.filter(c => c !== 'Todos').forEach(cat => {
      groups[cat] = [];
    });
    
    // Fill groups with filtered items
    filteredItems.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    return groups;
  }, [categories, filteredItems]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-30 w-80 bg-gray-50/50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6 text-gray-900">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/20">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">React Stack</h1>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                2026 Edition
              </span>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar tecnología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* List with Accordion */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 20px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #94a3b8;
            }
          `}</style>

          {Object.entries(groupedItems).map(([category, items]) => {
            // Skip empty categories if searching, or keep them? 
            // If items is empty and we have a search term, probably hide the category.
            if (items.length === 0 && searchTerm) return null;
            if (items.length === 0) return null; // Hide empty categories always? Or show empty state? Let's hide empty.

            const isExpanded = expandedCategories.includes(category);

            return (
              <div key={category} className="mb-2">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen size={16} className={isExpanded ? 'text-blue-500' : 'text-gray-400'} />
                    <span>{category}</span>
                    <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600">
                      {items.length}
                    </span>
                  </div>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-1 ml-2 pl-2 border-l-2 border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    {items.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelect(item.id)}
                          className={`
                            w-full text-left p-2.5 rounded-lg transition-all duration-200 flex items-center gap-3
                            ${isSelected 
                              ? 'bg-white shadow-sm border border-blue-100 text-blue-700' 
                              : 'hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 text-gray-600'}
                          `}
                        >
                          <div className={`
                            p-1.5 rounded-md transition-colors
                            ${isSelected ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}
                          `}>
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-medium truncate">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-gray-400">
                <Search size={20} />
              </div>
              <p className="text-sm text-gray-500 font-medium">No se encontraron resultados</p>
              <p className="text-xs text-gray-400 mt-1">Prueba con otro término</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
