import React from 'react';
import { Menu, BookOpen } from 'lucide-react';

export const MobileHeader = ({ onMenuClick }) => (
  <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-20">
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-blue-600 rounded-lg text-white">
        <BookOpen size={18} />
      </div>
      <span className="font-bold text-gray-900">React Stack</span>
    </div>
    <button 
      onClick={onMenuClick}
      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
    >
      <Menu size={24} />
    </button>
  </div>
);
