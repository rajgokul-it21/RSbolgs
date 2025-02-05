import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultBlogs from '../data/defaultBlogs';



const BlogDetail = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const allBlogs = [...defaultBlogs, ...storedBlogs];

    const selectedBlog = allBlogs[parseInt(id)]; 

    if (selectedBlog) {
      setBlog(selectedBlog); 
    } else {
      setBlog({ error: "Blog not found." }); 
    }
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  if (blog.error) {
    return <p>{blog.error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-4 p-4 md:p-8">
      <div className="hidden md:block"></div> 
  
      <div className="">
        <img src={blog.image} alt={blog.title} className="w-full h-100 object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-center">{blog.title}</h2>
        <p className="text-gray-700 text-justify leading-relaxed whitespace-pre-line">{blog.content}</p>
      </div>
  
      <div className="hidden md:block"></div> 
    </div>
  );
};

export default BlogDetail;
