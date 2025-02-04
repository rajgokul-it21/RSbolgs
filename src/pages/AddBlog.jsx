import React, { useState } from 'react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = () => {
    const newBlog = { title, content, image };
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    storedBlogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    setTitle('');
    setContent('');
    setImage('');
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
        required
        className="block w-full p-2 mb-2 border"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="block w-full p-2 mb-2 border"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        required
        className="block w-full p-2 mb-2 border"
      />
      <button
        onClick={handleAddBlog}
        className="block px-4 py-2 border hover:bg-gray-100"
      >
        Add Blog
      </button>
    </div>
  );
};

export default AddBlog;