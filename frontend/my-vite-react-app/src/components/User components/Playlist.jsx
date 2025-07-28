import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getplaylist } from '../../redux/slices/playlistSlice'; 
import Card from './Cards/Card'; 
import CardCarousel from './Cards/CardCarousel'; 
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Playlist = () => {
  const dispatch = useDispatch();
  const { playlist, status, error } = useSelector((state) => state.playlist);
const navigate =useNavigate()
  useEffect(() => {
    dispatch(getplaylist());
  }, [dispatch]);

  if (status === 'pending') {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (status === 'rejected') {
    return (
      <p className="text-red-500 text-center">
        Error: {typeof error === 'string' ? error : 'Something went wrong.'}
      </p>
    );
  }

  const playlistArray = Array.isArray(playlist) ? playlist : (playlist ? [playlist] : []);

  if (playlistArray.length === 0) {
    return <p className="text-gray-500 text-center">No playlists available.</p>;
  }

  const newplaylist = playlistArray
    .map((item) => item?.playlists)
    .filter((p) => Array.isArray(p)) // filter out undefined or non-array
    .flat(); // flatten if needed

  if (!newplaylist.length) {
    return <p className="text-gray-500 text-center">No playlists found inside data.</p>;
  }
  const user = localStorage.getItem('current user');

  const handleClick=(id)=>{
    if(!user){
        toast.error("Please Login")
        navigate('/login')
    }else{
       navigate(`/playlist/playlcomponent/${id}`) 
    }
   
  }

  return (
    <div className="bg-black text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Playlists</h2>
      <CardCarousel>
        {newplaylist.map((playlistItem) => {
          const firstSong = playlistItem?.songs?.[0];
          const image = firstSong?.image || '/default-image.png';
          const title = playlistItem?.name || 'Untitled Playlist';
          const artist = firstSong?.artist || 'Unknown Artist';

          return (
            <div key={playlistItem?._id || Math.random()} onClick={()=>handleClick(playlistItem?._id)}>
              <Card
                image={image}
                title={title}
                artist={artist}
                id={playlistItem?._id}
              />
            </div>
          );
        })}
      </CardCarousel>
    </div>
  );
};

export default Playlist;
