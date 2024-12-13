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
        <div className="bg-gray-900 p-4 text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Albums</h1>
            <CardCarousel>
                {albums.map((album) => (
                    <Card
                        key={album._id}
                        image={album.songs[0]?.image || "default-placeholder-image.jpg"} // Use the first song's image
                        title={album.songs[0]?.album || "No Album Title"} // Use the first song's title
                        artist={album.songs[0]?.artist || "Unknown Artist"} // Optionally include artist name
                    />
                ))}
            </CardCarousel>
        </div>
    );
}

export default Album;
