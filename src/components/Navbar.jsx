import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  let token = localStorage.getItem('token');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsUserDropdownOpen(false);
    navigate('/'); // Redirect after logout
  };

  return (
    <>
      <nav className={`bg-white ${!isMenuOpen ? 'shadow-lg' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo and Hamburger Icon Container */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-orange-500">Zwiggy</h1>

            {/* Hamburger Icon for Mobile Menu */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center text-gray-700 focus:outline-none ml-4"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition">Home</Link>
            <Link to="/add_restaurant" className="text-gray-700 hover:text-orange-500 transition">Add Restaurant</Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <button
                  onClick={() => setShowSignUpModal(true)}
                  className="hidden md:flex items-center border rounded-full px-4 py-1 text-gray-700 hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 4H8m8-8H8" />
                  </svg>
                  Sign Up
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden md:flex bg-yellow-500 text-white rounded-full px-4 py-2 hover:bg-yellow-600 transition"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center focus:outline-none"
                  aria-haspopup="true"
                >
                  <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                    <span className="font-medium text-gray-600">TS</span>
                  </div>
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50"
                    style={{ display: isUserDropdownOpen ? 'block' : 'none' }}
                  >
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white`}>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition">Home</Link>
            <Link to="/add_restaurant" className="text-gray-700 hover:text-orange-500 transition">Add Restaurant</Link>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-gray-700 hover:text-orange-500 transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showSignUpModal && <SignUpModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} />}
      {showLoginModal && <SignInModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Navbar;
