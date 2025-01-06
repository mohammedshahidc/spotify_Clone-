import React, { useEffect } from 'react';
import Searchbar from './Navbar/Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllsongs } from '../../../redux/slices/songSlice';
import Smnavbar from './Navbar/Smnavbar';

const Mobliesearch = () => {
  const dispatch=useDispatch()
  const { songs, status } = useSelector((state) => state.song);
useEffect(()=>{
dispatch(getAllsongs())
},[dispatch])
  return (
    <div className="fixed inset-0 flex justify-center bg-stone-950 p-5 z-50">
      <div className="bg-stone-800 rounded-lg shadow-lg p-6 w-full max-w-md max-h-fit">
        <h2 className="text-white text-lg font-bold mb-4 text-center">Search</h2>
        <Searchbar songs={songs} status={status}/>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Smnavbar />
      </div>
    </div>
  );
};

export default Mobliesearch;
