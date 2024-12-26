import { useEffect, useState } from 'react';
import { FaHome, FaHeart, FaListUl, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getuserplaylist } from '../../../redux/slices/userplaylistSlice';
import Userplaylist from '../Pages/Userplaylist';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const playlist = useSelector((state) => state.userplaylist.userplaylist || []);
    useEffect(() => {
        dispatch(getuserplaylist())
    }, [dispatch]);

    return (
        <div className="bg-stone-900 text-white h-screen rounded-lg ml-3 sm:w-20 md:w-64 flex flex-col transition-all duration-300">

            <div className="flex items-center justify-center md:justify-start py-6 px-4 md:px-6">
                <span className="text-2xl font-bold hidden md:block">Spotify</span>
                <span className="text-2xl font-bold block md:hidden">S</span>
            </div>


            <nav className="flex flex-col mt-4 space-y-6 px-4 md:px-6">
                <Link to="/" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
                    <FaHome className="text-xl" />
                    <span className="hidden md:block">Home</span>
                </Link>
                <Link to={"/likedsongs"} className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
                    <FaHeart className="text-xl" />
                    <span className="hidden md:block">Liked Songs</span>
                </Link>


                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-between w-full space-x-4 p-2 hover:bg-gray-800 rounded-lg focus:outline-none"
                    >
                        <div className="flex items-center space-x-4">
                            <FaListUl className="text-xl" />
                            <span className="hidden md:block">Playlists</span>
                        </div>
                        <div>{isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
                    </button>


                    {isDropdownOpen && (
                        <Userplaylist/>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;