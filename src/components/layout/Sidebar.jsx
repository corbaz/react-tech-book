import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import pkg from "../../../package.json";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Sidebar = ({
  searchTerm,
  setSearchTerm,
  categories,
  filteredItems,
  selectedId,
  onSelect,
  isOpen,
  onClose,
}) => {
  // Estado para secciones de acordeón expandidas
  // Inicializar con categorías que contengan el ítem seleccionado (si lo hay)
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // Estado inicial: Expandir todas las categorías que contengan el ítem seleccionado (si existe)
    // O simplemente expandir todas? "Todos" implica mostrar todo.
    return categories.filter((c) => c !== "Todos");
  });

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  // Agrupar ítems por categoría
  const groupedItems = useMemo(() => {
    const groups = {};
    // Inicializar grupos basados en categorías disponibles (excluyendo 'Todos')
    categories
      .filter((c) => c !== "Todos")
      .forEach((cat) => {
        groups[cat] = [];
      });

    // Llenar grupos con ítems filtrados
    filteredItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    return groups;
  }, [categories, filteredItems]);

  return (
    <>
      {/* Capa superpuesta para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Encabezado */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-gray-900 dark:text-white">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/20">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-xl tracking-tight">
                    React Stack
                  </h1>
                  <span className="text-xs font-mono text-blue-600 pt-1">
                    v.{pkg.version}
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                  2026 Edition
                </span>
              </div>
            </div>
            {/* Toggle de tema en desktop */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar tecnología..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end mt-6 px-1">
            <button
              onClick={() => {
                const allCategories = Object.keys(groupedItems);
                const isAllExpanded =
                  expandedCategories.length === allCategories.length;
                setExpandedCategories(isAllExpanded ? [] : allCategories);
              }}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
              title={
                expandedCategories.length === Object.keys(groupedItems).length
                  ? "Contraer todas las categorías"
                  : "Expandir todas las categorías"
              }
            >
              {expandedCategories.length === Object.keys(groupedItems).length ? (
                <>
                  <ChevronsUp size={14} />
                  <span>Contraer todo</span>
                </>
              ) : (
                <>
                  <ChevronsDown size={14} />
                  <span>Expandir todo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lista con Acordeón */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar bg-white dark:bg-gray-900">
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
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #4b5563;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #6b7280;
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
                  className="w-full flex items-center justify-between p-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen
                      size={16}
                      className={isExpanded ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}
                    />
                    <span>{category}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] px-1.5 py-0.5 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {items.length}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-1 ml-2 pl-2 border-l-2 border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-200">
                    {items.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelect(item.id)}
                          className={`
                            w-full text-left p-2.5 rounded-lg transition-all duration-200 flex items-center gap-3
                            ${
                              isSelected
                                ? "bg-white dark:bg-gray-800 shadow-sm border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-400"
                                : "hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"
                            }
                          `}
                        >
                          <div
                            className={`
                            p-1.5 rounded-md transition-colors
                            ${isSelected ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"}
                          `}
                          >
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-medium truncate">
                            {item.name}
                          </span>
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
              <p className="text-sm text-gray-500 font-medium">
                No se encontraron resultados
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Prueba con otro término
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
