import React from 'react';
import { Outlet, NavLink, Link, useSearchParams } from 'react-router-dom';

const Layout = () => {
  const menu = [
    { text: 'Nature', path: '/?category=Nature' },
    { text: 'Travel', path: '/?category=Travel' },
    { text: 'Technology', path: '/?category=Technology' },
    { text: 'Politics', path: '/?category=Politics' },
  ];

  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#5a0979] to-[#00d4ff] shadow-lg px-5 md:px-20">
        <div className="flex justify-between items-center py-5">
          <Link to="/">
            <span className="font-extrabold text-3xl text-white">
              ASTRO-BLOGS
            </span>
          </Link>

          <nav className="flex items-center space-x-5">
            <ul className="flex items-center space-x-4">
              {menu.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 text-xl hover:text-[#000319] transition-colors ${
                        isActive || selectedCategory === item.text
                          ? "text-[#000319e8] font-bold"
                          : "text-white"
                      }`
                    }
                  >
                    {item.text}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/create-blog">
              <button className="bg-[#000319] text-white px-4 py-2 rounded-lg ml-4 hover:bg-[#000319b9] transition-transform hover:scale-105">
                + New Post
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mx-auto px-5 md:px-20 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Brand Name */}
            <h3 className="font-extrabold text-2xl text-white">
              ASTRO-BLOGS
            </h3>

            {/* Footer Navigation */}
            <nav className="flex space-x-6">
              {footerLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className="hover:text-yellow-300 transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Copyright Information */}
            <p className="text-sm text-gray-400">
              &copy; 2025 ASTRO-BLOGS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
