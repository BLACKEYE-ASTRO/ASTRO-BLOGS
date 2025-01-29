import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const menu = [
    { text: 'Nature', path: '/nature' },
    { text: 'Travel', path: '/travel' },
    { text: 'Technology', path: '/technology' },
    { text: 'Politics', path: '/politics' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setMessage('Blog created successfully!');
        setTitle('');
        setCategory('');
        setImage(null);
        setDescription('');
      } else {
        setMessage(result.message || 'Error creating blog.');
      }
    } catch (error) {
      setMessage('Error submitting the form.');
      console.error(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-slate-200 w-[60%] p-5 rounded-xl">
        <h1 className="text-2xl mb-5">Create Blog Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="title" className="ml-1 text-gray-500">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="h-10 border border-gray-300 rounded my-2 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="category" className="ml-1 text-gray-500">
            Category
          </label>
          <select
            id="category"
            className="h-10 border border-gray-300 rounded my-2 p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {menu.map((x) => (
              <option value={x.text} key={x.text}>
                {x.text}
              </option>
            ))}
          </select>

          <label htmlFor="image" className="ml-1 text-gray-500">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="border-gray-300 rounded my-2 p-2"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label htmlFor="description" className="ml-1 text-gray-500">
            Post
          </label>
          <ReactQuill
            id="description"
            className="bg-white rounded mb-2 mt-2 editingarea"
            theme="snow"
            value={description}
            onChange={setDescription}
          />

          <button
            type="submit"
            className="bg-slate-500 text-white h-8 w-[100px] mt-2 rounded"
          >
            Submit
          </button>
        </form>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default CreateBlog;
