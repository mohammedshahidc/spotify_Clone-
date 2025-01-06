import  { useEffect } from 'react'
import Searchbar from './Layout/Navbar/Searchbar'
import { getAllsongs } from '../../redux/slices/songSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreatePlaylist = () => {
    const dispatch = useDispatch();
    const { songs, status } = useSelector((state) => state.song);


    useEffect(()=>{
        dispatch(getAllsongs());
      },[])
      
  return (
    <div>
      <Searchbar songs={songs} status={status} />
    </div>
  )
}

export default CreatePlaylist
