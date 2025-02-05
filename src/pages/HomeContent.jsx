import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import defaultBlogs from '../data/defaultBlogs';

const HomeContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    const combinedBlogs = [...defaultBlogs, ...storedBlogs].map(blog => ({
      ...blog,
      likes: blog.likes || 0 // Ensure likes property exists
    }));
    setBlogs(combinedBlogs);
    setComments(storedComments);
  }, []);

  const handleLike = (event, index) => {
    event.stopPropagation(); // Prevent the click from triggering the Link
    const updatedBlogs = [...blogs];
    updatedBlogs[index].likes += 1;
    setBlogs(updatedBlogs);

    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    if (index >= defaultBlogs.length) {
      storedBlogs[index - defaultBlogs.length].likes = updatedBlogs[index].likes;
      localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    }
  };

  const handleAddComment = (index, comment) => {
    const updatedComments = { ...comments };
    if (!updatedComments[index]) {
      updatedComments[index] = [];
    }
    updatedComments[index].push(comment);
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {blogs.map((blog, index) => (
        <div key={index} className="border p-4">
          <Link to={`/blog/${index}`} className="block">
            {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-2" />} 
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-sm">{blog.content.substring(0, 100)}...</p>
          </Link>

          <div className="flex justify-between mt-2">
            <button onClick={(e) => handleLike(e, index)} className="flex items-center text-blue-500">
              <ThumbsUp size={18} className="mr-1" /> Like ({blog.likes})
            </button>
            
          </div>

          <div className="mt-2">
            <textarea
              type="text"
              placeholder="Add a comment..."
              className="border p-2 w-full mb-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddComment(index, e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <div className="mt-1 text-sm text-gray-700">
              {comments[index]?.map((comment, i) => (
                <p key={i} className="border-b py-1">{comment}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
