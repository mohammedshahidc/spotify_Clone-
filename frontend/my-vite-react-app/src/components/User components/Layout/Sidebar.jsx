import { useEffect } from 'react';
import { FaHome, FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getuserplaylist } from '../../../redux/slices/userplaylistSlice';
import Userplaylist from '../Pages/Userplaylist';

const Sidebar = () => {
   
    const dispatch = useDispatch();

   
    useEffect(() => {
        dispatch(getuserplaylist());
    }, [dispatch]);

    return (
        <div className="bg-stone-900 text-white h-screen rounded-lg ml-3 sm:w-20 md:w-64 flex flex-col transition-all duration-300">
            
            <div className="flex items-center justify-center md:justify-start py-6 px-4 md:px-6">
                <span className="text-2xl font-bold hidden md:block">Spotify</span>
                <span className="text-2xl font-bold block md:hidden">S</span>
            </div>

           
            <nav className="flex flex-col mt-4 space-y-6 px-4 md:px-6">
              
                <Link
                    to="/"
                    className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg"
                >
                    <FaHome className="text-xl" />
                    <span className="hidden md:block">Home</span>
                </Link>

               
                <Link
                    to="/likedsongs"
                    className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg"
                >
                    <FaHeart className="text-xl" />
                    <span className="hidden md:block">Liked Songs</span>
                </Link>

               
                <div className="relative">
                    <Userplaylist />
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
