import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import defaultBlogs from '../data/defaultBlogs';

const HomeContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [views, setViews] = useState({});

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    const storedViews = JSON.parse(localStorage.getItem('views')) || {};

    const combinedBlogs = [...defaultBlogs, ...storedBlogs].map((blog, index) => ({
      ...blog,
      likes: storedLikes[index] || blog.likes || 0, 
      comments: storedComments[index] || [], 
      views: storedViews[index] || 0, 
    }));

    setBlogs(combinedBlogs);
    setComments(storedComments);
    setLikes(storedLikes);
    setViews(storedViews);
  }, []);

  const handleLike = (event, index) => {
    event.stopPropagation(); 
    const updatedBlogs = [...blogs];
    updatedBlogs[index].likes += 1;
    setBlogs(updatedBlogs);

    const updatedLikes = { ...likes, [index]: updatedBlogs[index].likes };
    setLikes(updatedLikes);
    localStorage.setItem('likes', JSON.stringify(updatedLikes));

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

  const handleView = (index) => {
    const updatedViews = { ...views, [index]: (views[index] || 0) + 1 };
    setViews(updatedViews);
    localStorage.setItem('views', JSON.stringify(updatedViews));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {blogs.map((blog, index) => (
        <div key={index} className="border p-4">
          <Link to={`/blog/${index}`} className="block" onClick={() => handleView(index)}>
            {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-2" />} 
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-sm">{blog.content.substring(0, 100)}...</p>
          </Link>

          <div className="flex justify-between mt-2">
            <button onClick={(e) => handleLike(e, index)} className="flex items-center text-red-500">
              <Heart size={18} className="mr-1" /> Like ({blog.likes})
            </button>
            <button className="flex items-center text-blue-500">
              <MessageCircle size={18} className="mr-1" /> Comment ({comments[index]?.length || 0})
            </button>
            <div className="flex items-center text-green-500">
              <Eye size={18} className="mr-1" /> Views ({views[index] || 0})
            </div>
          </div>

          <div className="mt-2">
            <textarea
              type="text"
              placeholder="Add a comment..."
              className="border p-1 w-full mb-1"
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
