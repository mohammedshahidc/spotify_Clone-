import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../redux/slices/albumSlice';
import CardCarousel from './Cards/CardCarousel';
import Card from './Cards/Card';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Album = () => {
    const dispatch = useDispatch();
    const { albums, status } = useSelector((state) => state.albums);
const navigate=useNavigate()
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    if (status === "pending") {
        return <p className="text-white">Loading...</p>;
    }
    if (status === "rejected") {
        return <p className="text-red-500">Error occurred while fetching albums.</p>;
    }
    const user = localStorage.getItem('current user');

    const handleClick=(id)=>{
        if(!user){
            toast.error("Please Login")
            navigate('/login')
        }else{
           navigate(`/albums/playlcomponent/${id}`) 
        }
       
      }

    return (
        <div className="bg-black  text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Albums</h1>
            <CardCarousel>
                {albums.map((album) => (
                    <div key={album._id} onClick={()=>handleClick(album._id)}>
                    <Card
                        
                        image={album.songs[0]?.image }
                        title={album.songs[0]?.album } 
                        artist={album.songs[0]?.artist } 
                    />
                    </div>
                ))}
            </CardCarousel>
        </div>
    );
}

export default Album;
