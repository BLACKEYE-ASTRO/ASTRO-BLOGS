import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout is the parent route */}
        <Route path="/" element={<Layout />}>
          {/* Home is rendered inside Outlet */}
          <Route index element={<Home />} />
          {/* Dynamic blog details route */}
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
