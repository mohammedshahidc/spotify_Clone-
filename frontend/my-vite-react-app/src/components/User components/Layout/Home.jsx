import Artist from '../Artist'
import Navbar from './Navbar/Navbar'
import Playlist from '../Playlist'
import Album from '../Album'
import Sidebar from './Sidebar'
import Dives from '../Dives'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getplaylist } from '../../../redux/slices/playlistSlice'

const Home = () => {
  const dispatch=useDispatch()
  const user = localStorage.getItem('current user')
 
  

  return (
    <div className="bg-black p-5 scrollbar-none">
      <Navbar />
      <div className="flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-full overflow-y-auto h-screen p-5 bg-stone-950 scrollbar-none">
          {user && (
            <div className="p-6 bg-stone-950">
              <Dives />
            </div>
          )}
          <div className="p-6">
            <Playlist />
          </div>
          <div className="p-4">
            <Artist />
          </div>
          <div className="p-4">
            <Album />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
