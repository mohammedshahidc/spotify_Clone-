import React from 'react'
import { FaHome, FaHeart, FaListUl } from 'react-icons/fa';
const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 sm:w-20 md:w-64 flex flex-col transition-all duration-300">
            {/* Logo Section */}
            <div className="flex items-center justify-center md:justify-start py-6 px-4 md:px-6">
                <span className="text-2xl font-bold hidden md:block">Spotify</span>
                <span className="text-2xl font-bold block md:hidden">S</span>
            </div>

            {/* Navigation Options */}
            <nav className="flex flex-col mt-4 space-y-6 px-4 md:px-6">
                <a
                    href="#"
                    className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg"
                >
                    <FaHome className="text-xl" />
                    <span className="hidden md:block">Home</span>
                </a>
                <a
                    href="#"
                    className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg"
                >
                    <FaHeart className="text-xl" />
                    <span className="hidden md:block">Liked Songs</span>
                </a>
                <a
                    href="#"
                    className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg"
                >
                    <FaListUl className="text-xl" />
                    <span className="hidden md:block">Playlists</span>
                </a>
            </nav>
        </div>
  )
}

export default Sidebar
