import React from 'react';
import { Home, Plus } from 'lucide-react';

const Sidebar = ({ onSelect }) => {
  return (
    <aside className="w-48 bg-gray-100 p-4 border-r border-gray-300 h-full">
      <button
        className="flex items-center mb-4 p-2 hover:bg-gray-200 rounded"
        onClick={() => onSelect('home')}
      >
        <Home className="mr-2" /> Home
      </button>
      <button
        className="flex items-center p-2 hover:bg-gray-200 rounded"
        onClick={() => onSelect('addBlog')}
      >
        <Plus className="mr-2" /> Add Blog
      </button>
    </aside>
  );
};

export default Sidebar;