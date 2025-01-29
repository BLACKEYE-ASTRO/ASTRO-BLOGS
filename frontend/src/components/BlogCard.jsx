import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blogdata, id, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Blog deleted successfully');
        onDelete(id); // Notify parent component about the deletion
      } else {
        console.error('Error deleting blog:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // Format the created_on date
  const formattedDate = new Date(blogdata.created_on).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-[#03071d] border border-gray-700 shadow-lg rounded-xl overflow-hidden transform transition duration-200 hover:scale-105 flex flex-col justify-between">
      <Link to={`/blog/${id}`} className="flex-grow">
        <img
          src={blogdata.image}
          alt={blogdata.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white truncate">{blogdata.title}</h2>
          <p
            className="text-sm text-gray-300 mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blogdata.description }}
          />
          <p className="text-xs text-gray-400 mt-4">Created on: {formattedDate}</p>
        </div>
      </Link>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition duration-150"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
