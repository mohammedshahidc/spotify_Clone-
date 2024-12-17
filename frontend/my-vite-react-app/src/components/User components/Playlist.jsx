import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getplaylist } from '../../redux/slices/playlistSlice';
import Card from "./Cards/Card";
import CardCarousel from "./Cards/CardCarousel";
import { Link } from "react-router-dom";

const Playlist = () => {
    const dispatch = useDispatch();
    const { playlist, status } = useSelector((state) => state.playlist);

    useEffect(() => {
        dispatch(getplaylist());
    }, [dispatch]);

    if (status === "pending") {
        return <p className="text-white text-center">Loading...</p>;
    }
    if (status === "rejected") {
        return <p className="text-red-500 text-center">Error fetching playlists.</p>;
    }

    return (
        <div className="bg-gray-900 p-4 text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Playlists</h2>
            <CardCarousel>
                {playlist.map((item) =>
                    item.playlist.map((play) => (
                        <Link key={item._id} to={`/playlist/playlcomponent/${play._id}`}>
                            <Card
                                key={play._id}
                                image={play.songs[0]?.image}
                                title={play.name}
                                artist={play.songs[0]?.artist}
                                id={play._id}
                            />
                        </Link>
                    ))
                )}
            </CardCarousel>
        </div>
    );
};

export default Playlist;
