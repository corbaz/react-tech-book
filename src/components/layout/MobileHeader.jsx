import { Menu, BookOpen } from "lucide-react";
import pkg from "../../../package.json";
import { ThemeToggle } from "../ui/ThemeToggle";

export const MobileHeader = ({ onMenuClick }) => (
  <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 transition-colors duration-300">
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-blue-600 rounded-lg text-white">
        <BookOpen size={18} />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold text-gray-900 dark:text-white">
          React Stack
        </span>
        <span className="text-xs font-mono text-blue-600">v.{pkg.version}</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <button
        onClick={onMenuClick}
        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>
    </div>
  </div>
);
