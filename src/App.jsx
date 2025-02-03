import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeContent from './pages/HomeContent';
import AddBlog from './pages/AddBlog';

const App = () => {
  const [view, setView] = useState('home');

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setView} />
      <div className="flex-1">
        <Header />
        <main className="p-4">
          {view === 'home' && <HomeContent />}
          {view === 'addBlog' && <AddBlog />}
        </main>
      </div>
    </div>
  );
};

export default App;