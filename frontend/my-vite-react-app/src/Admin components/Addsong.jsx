import React from 'react';
import FormforSong from './Admin layouts/FormforSong';
import { useDispatch } from 'react-redux';
import { addSongs, getAlladminSongs } from '../redux/slices/admin slices/AdminSongSlice';
import AdminSidebar from './Admin layouts/AdminSidebar';
import Navbar from '../components/User components/Layout/Navbar/Navbar';

const Addsong = () => {
    const dispatch = useDispatch();
    const handleaddsong = async (data) => {
        await dispatch(addSongs(data));
        await dispatch(getAlladminSongs());
    };

    return (
        <div className='w-screen h-screen bg-black'>
            <Navbar />
            <div className='flex h-full w-screen bg-black fixed'>
                <div>
                    <AdminSidebar />
                </div>
                <div className='w-3/4'>
                    <div className='h-screen overflow-y-scroll'> 
                        <FormforSong handleuploadSubmit={handleaddsong} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addsong;
