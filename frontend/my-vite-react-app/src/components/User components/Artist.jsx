

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getartist } from "../../redux/slices/artist.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Artist = () => {
    const dispatch = useDispatch();
    const { artist } = useSelector((state) => state.artist);
    const navigate = useNavigate();
    const user = localStorage.getItem('current user');

    useEffect(() => {
        dispatch(getartist());
    }, [dispatch]);

    const handleClick = (artistName) => {
        if (!user) {
            toast.error("Please Login");
            navigate('/login');
        } else {
            navigate(`/artist/playlcomponent/${artistName}`);
        }
    };

    return (
        <div className="bg-black text-white p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Popular artists</h1>
                <button className="text-gray-400 hover:text-white text-base font-medium">
                    Show all
                </button>
            </div>

            {/* Artist Cards */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-3">
                {artist && artist.length > 0 ? (
                    artist.map((art) => (
                        art.songs && art.songs.length > 0 && (
                            <div
                                key={art.artist}
                                onClick={() => handleClick(art.artist)}
                                className="flex-shrink-0 flex flex-col items-center text-center group cursor-pointer"
                            >
                                <div className="relative mb-2">
                                    <img
                                        src={art.songs[0].artistImage}
                                        alt={art.artist}
                                        className="w-36 h-36 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {art.artist}
                                </h3>
                                <p className="text-gray-400 text-sm">artist</p>
                            </div>
                        )
                    ))
                ) : (
                    <div className="text-gray-400 text-lg">No artists found</div>
                )}
            </div>

            {/* Custom scrollbar styling */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default Artist;

