// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const HomeContent = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
//     setBlogs(storedBlogs);
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Blogs</h2>
//       <div className="grid grid-cols-4 gap-4">
//         {blogs.length ? (
//           blogs.map((blog, index) => (
//             <Link to={`/blog/${index}`} key={index} className="p-8 border hover:bg-gray-50">
//               {blog.image && <img src={blog.image} alt="Blog" className="w-full h-40 object-cover mb-2" />}
//               <h3 className="text-lg font-bold">{blog.title}</h3>
//               <p>{blog.content.substring(0, 150)}...</p>
//             </Link>
//           ))
//         ) : (
//           <p>No blogs available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeContent;




import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeContent = () => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
    <div className="grid grid-cols-4 gap-4">
      {blogs.map((blog, index) => (
        <div key={index} className="border p-4 bg-white">
          <Link to={`/blog/${index}`}>
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
            <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
            <p className="text-gray-600 mt-1">{blog.content.substring(0, 100)}...</p>
          </Link>
          <div className="flex justify-around mt-4">
            <button className="flex items-center text-gray-500 hover:text-red-500">
              <Heart className="mr-1" size={20} /> Like
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <MessageCircle className="mr-1" size={20} /> Comment
            </button>
            <button className="flex items-center text-gray-500 hover:text-green-500">
              <Share2 className="mr-1" size={20} /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default HomeContent;
