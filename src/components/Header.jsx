import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-blue-300 p-4 shadow-md">
      <div className="text-2xl font-bold">RS Blog</div>
      <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
        <input
          type="text"
          placeholder="Search Here"
          className="outline-none text-black px-2 bg-transparent"
        />
        <Search className="text-gray-500" size={20} />
      </div>
    </header>
  );
};

export default Header;


