import { ExternalLink, X } from "lucide-react";
import { Badge } from "../ui/Badge";
import { InstallCommand } from "./InstallCommand";
import { AISection } from "./AISection";

export const TechDetail = ({ activeItem, onClose }) => {
  if (!activeItem) {
    return (
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50/50 text-gray-400 p-8 text-center">
        <div>
          <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 rounded-full" />
          </div>
          <p>Selecciona una tecnología para ver los detalles</p>
        </div>
      </div>
    );
  }

  const Icon = activeItem.icon;

  return (
    <div className="flex-1 overflow-y-auto bg-white h-full relative animate-in fade-in duration-300">
      {/* Botón Cerrar en Móvil */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
      >
        <X size={24} />
      </button>

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 p-8 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 h-fit">
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {activeItem.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-blue-100 text-blue-700">
                    {activeItem.category}
                  </Badge>
                  {activeItem.tags.map((tag) => (
                    <Badge key={tag} className="bg-gray-100 text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <a
              href={activeItem.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow text-sm font-medium"
            >
              Website
              <ExternalLink size={16} />
            </a>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {activeItem.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Instalación
              </h3>
              <InstallCommand command={activeItem.installCmd} />
            </div>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 gap-4">
              <a
                href={activeItem.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group bg-white block"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                  Repositorio GitHub
                </div>
                <div className="text-xs text-gray-500">
                  Explora el código fuente y contribuye.
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de IA y Contenido */}
      <div className="max-w-3xl mx-auto p-8">
        <AISection key={activeItem.id} selectedTech={activeItem} />
      </div>
    </div>
  );
};
