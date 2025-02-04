import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import defaultBlogs from '../data/defaultBlogs';

const HomeContent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const combinedBlogs = [...defaultBlogs, ...storedBlogs].map(blog => ({
      ...blog,
      likes: blog.likes || 0 
    }));
    setBlogs(combinedBlogs);
  }, []);

  const handleLike = (event, index) => {
    event.stopPropagation(); 
    const updatedBlogs = [...blogs];
    updatedBlogs[index].likes += 1;
    setBlogs(updatedBlogs);

    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    if (index >= defaultBlogs.length) {
      storedBlogs[index - defaultBlogs.length].likes = updatedBlogs[index].likes;
      localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    } else {
      const defaultLikes = JSON.parse(localStorage.getItem('defaultLikes')) || {};
      defaultLikes[index] = updatedBlogs[index].likes;
      localStorage.setItem('defaultLikes', JSON.stringify(defaultLikes));
    }
  };

  useEffect(() => {
    const defaultLikes = JSON.parse(localStorage.getItem('defaultLikes')) || {};
    setBlogs(prevBlogs =>
      prevBlogs.map((blog, index) => ({
        ...blog,
        likes: defaultLikes[index] || blog.likes
      }))
    );
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Your Daily Blogs</h1>
    <div className="mt-4 grid grid-cols-3 gap-4">
      {blogs.map((blog, index) => (
        <div key={index} className="border p-4">
          <Link to={`/blog/${index}`}>
            {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-2" />}
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-sm">{blog.content.substring(0, 100)}...</p>
          </Link>

          <div className="flex justify-between mt-2">
            <button onClick={(e) => handleLike(e, index)} className="flex items-center text-blue-500">
              <ThumbsUp size={18} className="mr-1" /> Like ({blog.likes})
            </button>
            <button className="flex items-center text-green-500">
              <MessageCircle size={18} className="mr-1" /> Comment
            </button>
            <button className="flex items-center text-purple-500">
              <Share2 size={18} className="mr-1" /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default HomeContent;




