import { useTechSelection } from "./hooks/useTechSelection";
import { Sidebar } from "./components/layout/Sidebar";
import { MobileHeader } from "./components/layout/MobileHeader";
import { TechDetail } from "./components/features/TechDetail";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

function App() {
  const {
    selectedId,
    setSelectedId,
    searchTerm,
    setSearchTerm,
    isSidebarOpen,
    setIsSidebarOpen,
    categories,
    filteredItems,
    activeItem,
  } = useTechSelection();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        filteredItems={filteredItems}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 h-full overflow-hidden relative w-full">
        <ErrorBoundary>
          <TechDetail
            activeItem={activeItem}
            onClose={() => setSelectedId(null)}
          />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
