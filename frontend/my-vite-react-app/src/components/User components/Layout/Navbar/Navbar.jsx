import { useEffect, useState } from 'react';
import { FaSpotify, FaSearch, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../redux/slices/loginSlice';
import Searchbar from './Searchbar';
import { adminlogout } from '../../../../redux/slices/admin slices/adminloginSlice';
import { getAllusers } from '../../../../redux/slices/admin slices/adminusersslice';
import { persistor } from '../../../../redux/store';
import { getAllsongs } from '../../../../redux/slices/songSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const localuser=localStorage.getItem('current user')
  
  const admin = useSelector((state) => state.admin.user);
  const { songs, status } = useSelector((state) => state.song);

  const [isDropdown, setIsDropdown] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };
  useEffect(()=>{
    dispatch(getAllusers())
    dispatch(getAllsongs());

  },[])

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      persistor.purge().then(() => {
        localStorage.clear(); 
        console.log("Persisted state and localStorage cleared.");
      });
    } else if (admin) {
      dispatch(adminlogout());
      persistor.purge().then(() => {
        localStorage.clear(); 
        console.log("Persisted state and localStorage cleared for admin.");
      });
    }
    navigate('/');
  };
  

  return (
    <nav className="bg-black p-4 flex items-center justify-between relative z-50">
      {/* Logo */}
      <div className="text-white text-xl font-bold flex items-center">
        <FaSpotify className="text-green-500 mr-2" />
        <span>Spotify</span>
      </div>

      {/* Center Section */}
      <div className="flex-1 flex justify-center items-center mx-4">
        <Link
          to="/"
          className="flex hidden sm:block items-center text-white bg-stone-900 hover:scale-110 transform transition duration-500 p-1 rounded-full mr-5"
        >
          <FaHome size={35} />
        </Link>

        <div className="hidden md:block w-[450px]">
          <Searchbar songs={songs} status={status}  />
        </div>

        <Link to="/search">
          <button className="block hidden sm:block md:hidden ml-4 text-white p-4 rounded-full bg-stone-900">
            <FaSearch size={20} />
          </button>
        </Link>
      </div>

      
      <div className="flex items-center space-x-2">
        {localuser  ? (
          <div className="relative flex flex-col items-center group">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 bg-green-500 cursor-pointer"
              onClick={toggleDropdown}
            >
             <img src={user?.profilePicture}/>
            </div>

            {/* Username Hover Tooltip */}
            <span className="absolute top-10 right-0 translate-x-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition-opacity duration-300 whitespace-nowrap">
              {user?.user?.toUpperCase()}
            </span>

            {/* Dropdown Menu */}
            {isDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register">
              <button className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs sm:text-sm">
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400 text-xs sm:text-sm">
                Log in
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Searchbar Popup */}
      {click && (
        <div className="absolute top-14 left-0 w-full bg-black p-4 z-50">
          <Searchbar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
