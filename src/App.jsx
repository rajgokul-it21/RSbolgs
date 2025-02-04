import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomeContent from './pages/HomeContent';
import AddBlog from './pages/AddBlog';
import BlogDetail from './pages/BlogDetail';

const Layout = ({ children }) => {
  const location = useLocation();
  const isBlogDetail = location.pathname.startsWith('/blog/');

  return (
    <div className="flex flex-col h-screen">
      {!isBlogDetail && <Header />}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;