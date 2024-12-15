import React, { useState } from 'react';
import { FaSpotify } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/loginSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
const [isDropdown,setIsDropdown]=useState(false)

const controllDropdown=()=>{
  if(isDropdown){
    setIsDropdown(false)
  }else{
    setIsDropdown(true)
  }
}

const dispatch=useDispatch()
  return (
    <nav className="bg-gray-900 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white text-xl font-bold flex items-center">
        <FaSpotify className="text-green-500 mr-2" />
        <span>Spotify</span>
      </div>

      
      <div className="flex flex-grow mx-4">
        <input
          type="text"
          placeholder="What do you want to play?"
          className="w-full p-2 bg-gray-800 text-white rounded-l-md focus:outline-none md:p-3 md:mr-2"
        />
        <button className="p-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-xs sm:text-sm">
          Search
        </button>
      </div>

     
      <div className="flex items-center space-x-2">
        {user ? (
          <div className="relative flex flex-col items-center">
           
            <div className="group">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 bg-green-500">
                <p className="text-white text-lg cursor-pointer" onClick={controllDropdown}>
                  {user.name[0].toUpperCase()}
                </p>
              </div>
              {isDropdown &&(
                <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                  onClick={() =>dispatch(logout()) }
                >
                  Logout
                </button>
              </div>
              )}

            
              <span className="absolute top-10 right-0 translate-x-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition-opacity duration-300 whitespace-nowrap">
                {user.name.toUpperCase()}
              </span>
            </div>
          </div>
        ) : (
          <>
           
            <Link to="/register">
              <button className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs sm:text-sm">
                Sign up
              </button>
            </Link>
            <Link to={'/login'}>
              <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400 text-xs sm:text-sm">
                Log in
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
