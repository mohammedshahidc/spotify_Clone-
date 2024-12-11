import React from 'react';
import { FaSpotify } from 'react-icons/fa'; // Ensure this import is correct
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white text-xl font-bold flex items-center">
        <FaSpotify className="text-green-500 mr-2" /> {/* Spotify icon */}
        <span>Spotify</span>
      </div>

      {/* Search Input */}
      <div className="flex flex-grow mx-4">
        <input
          type="text"
          placeholder="What do you want to play?"
          className="w-full p-2 bg-gray-800 text-white rounded-l-md focus:outline-none md:p-3 md:mr-2"
        />
        <button className="p-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-xs sm:text-sm">Search</button>
      </div>

      {/* Signup and Login Buttons */}
      <div className="flex space-x-2">
       <Link to={"/register"}><button className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs sm:text-sm">Sign up</button></Link> 
        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400 text-xs sm:text-sm">Log in</button>
      </div>
    </nav>
  );
};

export default Navbar;
