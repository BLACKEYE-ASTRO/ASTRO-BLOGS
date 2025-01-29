import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams(); // Get the dynamic blog ID from the route
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog details from the server
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  // Format the created_on date
  const formattedDate = new Date(blog.created_on).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[60%] overflow-hidden">
        <h1 className="mt-1 text-3xl font-extrabold">{blog.title}</h1>
        <div className="flex mt-4 mb-4">
          <small>{formattedDate}</small>
        </div>
        <img src={blog.image} alt={blog.title} className="rounded-lg" />
        <div>
          <h2 className="text-2xl mt-2 mb-2">Description</h2>
          <p dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
