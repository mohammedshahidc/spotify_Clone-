import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { CiGrid41 } from 'react-icons/ci';
import Smnavbar from '../Layout/Navbar/Smnavbar';
import { getuserplaylist } from '../../../redux/slices/userplaylistSlice';
import { Link } from 'react-router-dom';
import { getartist } from '../../../redux/slices/artist.slice';
import { getAlbums } from '../../../redux/slices/albumSlice';
import Card from '../Cards/Card';

const Laibrery = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('current user');
    const [list, setList] = useState(true);
    const { artist } = useSelector((state) => state.artist);
    const { albums } = useSelector((state) => state.albums);
    const userplaylist = useSelector((state) => state.userplaylist.userplaylist);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            Promise.all([
                dispatch(getuserplaylist()),
                dispatch(getartist()),
                dispatch(getAlbums())
            ]).finally(() => setLoading(false));
        }
    }, [dispatch, user]);

    const handleListToggle = () => {
        setList((prev) => !prev);
    };

    if (loading) {
        return <div className="text-white">Loading...</div>; // Add a spinner here for better UX
    }

    return (
        <div className="p-4 bg-black h-screen relative overflow-y-auto">
            <div className="absolute top-4 right-4 text-white" onClick={handleListToggle}>
                <CiGrid41 size={35} />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4"> {/* Remove sm:grid-cols for only small screens */}
                {/* Liked Songs Section */}
                {list ? (
                    <Link to={'/likedsongs'}>
                        <div className="p-4 bg-stone-900 text-white rounded-md shadow-md flex items-center space-x-4">
                            <div className="w-16 h-16 bg-red-500 flex items-center justify-center rounded-full">
                                <FaHeart className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Liked songs</h3>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <Card
                        image={<FaHeart className="text-white text-2xl" />}
                        title={'Liked songs'}
                    />
                )}

                {/* User Playlists */}
                {userplaylist.length === 0 ? (
                    <p className="text-gray-500">No playlists found.</p>
                ) : (
                    userplaylist.map((playlist, index) => (
                        list ? (
                            <Link key={index} to={`/userplaylist/playcomponent/${playlist._id}`}>
                                <div className="p-4 bg-stone-900 text-white rounded-md shadow-md flex items-center space-x-4">
                                    <img
                                        src={playlist?.songs?.[0]?.image || '/default-image.png'}
                                        alt={playlist?.name || 'Playlist'}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {playlist?.name || 'Untitled Playlist'}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {playlist?.songs?.length || 0} songs
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Card
                                key={playlist._id}
                                image={playlist?.songs?.[0]?.image || '/default-image.png'}
                                title={playlist?.name}
                                artist={playlist?.songs?.[0]?.artist || "Unknown Artist"}
                                id={playlist._id}
                            />
                        )
                    ))
                )}
            </div>

            {/* Artists Section */}
            <div className="mt-8">
                <h2 className="text-white text-xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-1 gap-4"> {/* Remove sm:grid-cols for only small screens */}
                    {artist.length === 0 ? (
                        <p className="text-gray-500">No artists found.</p>
                    ) : (
                        artist.map((artistItem, index) => (
                            list ? (
                                <Link key={index} to={`/artist/${artistItem.id}`}>
                                    <div className="p-4 bg-stone-900 text-white rounded-md shadow-md flex items-center space-x-4">
                                        <img
                                            src={artistItem.songs?.[0]?.image || '/default-image.png'}
                                            alt={artistItem?.artist || 'Playlist'}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {artistItem?.artist || 'Untitled Playlist'}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {artistItem.songs?.length || 0} songs
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Card
                                    key={artistItem.id}
                                    image={artistItem.songs[0]?.image || '/default-artist.png'}
                                    title={artistItem.songs[0]?.artist || 'Unknown Artist'}
                                    artist={artistItem.songs[0]?.artist || 'Unknown Artist'}
                                    id={artistItem.id}
                                />
                            )
                        ))
                    )}
                </div>
            </div>

            {/* Albums Section */}
            <div className="mt-8">
                <h2 className="text-white text-xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-1 gap-4"> {/* Remove sm:grid-cols for only small screens */}
                    {albums.length === 0 ? (
                        <p className="text-gray-500">No albums found.</p>
                    ) : (
                        albums.map((album, index) => (
                            list ? (
                                <Link key={index} to={`/album/${album._id}`}>
                                    <div className="p-4 bg-stone-900 text-white rounded-md shadow-md flex items-center space-x-4">
                                        <img
                                            src={album.songs?.[0]?.image || '/default-image.png'}
                                            alt={album?._id || 'Playlist'}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {album?._id || 'Untitled Playlist'}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {album.songs?.length || 0} songs
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Card
                                    key={album._id}
                                    image={album.songs[0]?.image || '/default-album.png'}
                                    title={album.name || 'Untitled Album'}
                                    artist={album.songs[0]?.artist || 'Unknown Artist'}
                                    id={album._id}
                                />
                            )
                        ))
                    )}
                </div>
            </div>

            {/* Navbar at the Bottom */}
            <div className="fixed bottom-0 left-0 w-full z-50">
                <Smnavbar />
            </div>
        </div>
    );
};

export default Laibrery;
