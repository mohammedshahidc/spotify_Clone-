

import Artist from '../Artist';
import Navbar from './Navbar/Navbar';
import Playlist from '../Playlist';
import Album from '../Album';
import Sidebar from './Sidebar';
import Dives from '../Dives';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getplaylist } from '../../../redux/slices/playlistSlice';
import Smnavbar from './Navbar/Smnavbar';

const Home = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('current user');

  useEffect(() => {
    if (user) {
      dispatch(getplaylist());
    }
  }, [dispatch, user]);

  return (
    <div className="bg-black min-h-screen flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <div className="flex-shrink-0 p-4 sm:p-6 md:p-4 lg:p-8">
        <Navbar />
      </div>

      {/* Fixed Sidebar */}
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 px-4 sm:px-6 md:px-4 lg:px-8 pb-16 sm:pb-8">
        {/* Spacer for fixed sidebar */}
        <div className="hidden sm:block sm:w-16 md:w-64 lg:w-72 xl:w-80 flex-shrink-0"></div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-black rounded-lg scrollbar-none sm:ml-4 max-h-[calc(100vh-12rem)]">
          <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            {user && <Dives />}
            <Artist />
            <Album />
            <Playlist />
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-50">
        <Smnavbar />
      </div>
    </div>
  );
};

export default Home;
