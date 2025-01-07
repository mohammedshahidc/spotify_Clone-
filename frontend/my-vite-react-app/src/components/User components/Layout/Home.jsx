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
    <div className="bg-black p-5 overflow-hidden sm:p-6 md:p-4 lg:p-8">
      <div className="">
        <Navbar />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="hidden sm:w-1/4 lg:w-1/5 sm:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto h-screen p-5 bg-stone-950 scrollbar-none">
          {user && (
            <div className="p-0 sm:p-6">
              <Dives />
            </div>
          )}
          <div className="p-0">
            <Playlist />
          </div>
          <div className="p-0">
            <Artist />
          </div>
          <div className="p-0">
            <Album />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Smnavbar />
      </div>
    </div>
  );
};

export default Home;
