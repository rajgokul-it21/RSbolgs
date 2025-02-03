import React, { useState, useEffect } from 'react';

const HomeContent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Blogs</h2>
      {blogs.length ? (
        blogs.map((blog, index) => (
          <div key={index} className="p-4 mb-2 border rounded shadow-sm">
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default HomeContent;