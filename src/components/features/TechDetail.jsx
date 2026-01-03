import { ExternalLink, BookOpen, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "../ui/Badge";
import { InstallCommand } from "./InstallCommand";
import { AISection } from "./AISection";
import { Footer } from "../layout/Footer";
import { useRef } from "react";

export const TechDetail = ({ activeItem, onClose }) => {
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (!activeItem) {
    return (
      <div className="hidden lg:flex flex-1 flex-col h-full bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 p-8 text-center">
          <div>
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
            </div>
            <p>Selecciona una tecnología para ver los detalles</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = activeItem.icon;

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-white dark:bg-black h-full relative animate-in fade-in duration-300 flex flex-col no-scrollbar"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Botones de control de scroll flotantes */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
        <button
          onClick={scrollToTop}
          className="p-2 bg-gray-900 dark:bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          title="Ir arriba"
        >
          <ArrowUp size={20} />
        </button>
        <button
          onClick={scrollToBottom}
          className="p-2 bg-gray-900 dark:bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          title="Ir abajo"
        >
          <ArrowDown size={20} />
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 p-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 h-fit">
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeItem.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    {activeItem.category}
                  </Badge>
                  {activeItem.tags.map((tag) => (
                    <Badge key={tag} className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {activeItem.docsUrl && (
                <a
                  href={activeItem.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm hover:shadow text-sm font-medium whitespace-nowrap group"
                >
                  <BookOpen
                    size={16}
                    className="shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  />
                  <span>Docs</span>
                </a>
              )}
              <a
                href={activeItem.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-all shadow-sm hover:shadow text-sm font-medium whitespace-nowrap"
              >
                <ExternalLink size={16} className="shrink-0" />
                <span>Website</span>
              </a>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {activeItem.description}
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                Instalación
              </h3>
              <InstallCommand command={activeItem.installCmd} />
            </div>

            {/* Additional Resources */}
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                Recursos
              </h3>
              <a
                href={activeItem.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-md transition-all cursor-pointer group bg-white dark:bg-gray-900 block"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 mb-1 transition-colors">
                      Repositorio GitHub
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      Explora el código fuente y contribuye al proyecto.
                    </div>
                  </div>
                  <ExternalLink
                    size={20}
                    className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de IA y Contenido */}
      <div className="w-full px-6 py-6 flex-1">
        <div className="max-w-3xl mx-auto">
          <AISection key={activeItem.id} selectedTech={activeItem} />
        </div>
      </div>

      <Footer />
    </div>
  );
};
