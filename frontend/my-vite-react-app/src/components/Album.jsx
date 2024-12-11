import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../redux/slices/albumSlice';
import CardCarousel from './CardCarousel';
import Card from './Card';

const Album = () => {
    const dispatch = useDispatch();
    const { albums, status } = useSelector((state) => state.albums);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    if (status === "pending") {
        return <p className="text-white">Loading...</p>;
    }
    if (status === "rejected") {
        return <p className="text-red-500">Error occurred while fetching albums.</p>;
    }

    return (
        <div className="bg-black text-white p-4">
            <h1 className="text-2xl font-bold">Albums</h1>
            <CardCarousel>
                {albums.map((album) => (
                    <Card
                        key={album._id}
                        image={album.songs[1]?.image} // Use the first song's image
                        title={album.songs[0]?.album} // Use the first song's title
                        
                    />
                ))}
            </CardCarousel>
        </div>
    );
}

export default Album;
