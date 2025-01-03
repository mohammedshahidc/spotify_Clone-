import React from 'react';
import FormforSong from './Admin layouts/FormforSong';
import { useDispatch } from 'react-redux';
import { addSongs, getAlladminSongs } from '../redux/slices/admin slices/AdminSongSlice';
import AdminSidebar from './Admin layouts/AdminSidebar';
import Navbar from '../components/User components/Layout/Navbar/Navbar';
import AdminNavbar from './Admin layouts/AdminNavbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Addsong = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate('')
    const handleaddsong = async (data) => {
        try {
            await dispatch(addSongs(data));
            await dispatch(getAlladminSongs());
            toast.success('song added successfully')
            navigate('/admin/songs')
        } catch (error) {
            console.log(error);
            toast.error('Failed to upload the song. Please try again.')
        }

    };

    return (
        <div className='w-screen h-screen bg-black'>
            <AdminNavbar />
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
