import React, { useState } from 'react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddBlog = () => {
    const newBlog = { title, content };
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    storedBlogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    setTitle('');
    setContent('');
    alert('Blog added successfully!');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add a New Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleAddBlog}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Blog
      </button>
    </div>
  );
};

export default AddBlog;