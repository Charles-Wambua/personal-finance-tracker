import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // or use any icon library

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === '/login' || pathname === '/register') return null;

  const handleLogout = () => {
    // TODO: Add logout logic
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Add', path: '/add-transaction' },
    { name: 'Categories', path: '/categories' },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-semibold text-gray-800 tracking-tight hover:opacity-90 transition"
        >
          💰 FinanceTracker
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`transition duration-200 px-2 py-1 rounded-md ${
                pathname === path
                  ? 'text-black font-semibold bg-gray-100'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              {name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition duration-200 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-inner">
          {navItems.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full px-4 py-2 rounded-md text-sm transition duration-200 ${
                pathname === path
                  ? 'text-black font-semibold bg-gray-100'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              {name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
