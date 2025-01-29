import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // Get the 'category' query param

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          category
            ? `http://localhost:5000/api/blogs?category=${category}`
            : `http://localhost:5000/api/blogs`
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [category]);

  const handleDelete = (id) => {
    // Update state to remove the deleted blog
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-4">
        {category ? `Blogs in "${category}" Category` : 'All Blogs'}
      </h2>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blogdata={blog}
              id={blog.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className='text-gray-400'>No blogs found.</p>
      )}
    </div>
  );
};

export default Home;
