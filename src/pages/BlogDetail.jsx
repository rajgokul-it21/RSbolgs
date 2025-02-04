import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlog(storedBlogs[id]);
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="bg-white"></div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
        {blog.image && <img src={blog.image} alt="Blog" className="w-full h-60 object-cover mb-4 rounded" />}
        <p>{blog.content}</p>
      </div>
      <div className="bg-white"></div>
    </div>
  );
};

export default BlogDetail;