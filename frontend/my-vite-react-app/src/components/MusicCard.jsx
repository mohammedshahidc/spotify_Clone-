import React, { useState, useRef } from "react";

const MusicCard = ({ image, title, artist, audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            {/* Album Image */}
            <img src={image} alt={title} className="w-full h-24 md:h-48 object-cover p-1" />

            {/* Details */}
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-400 truncate">{artist}</p>
                <button 
                    onClick={handlePlayPause} 
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    {isPlaying ? "Pause" : "Play"}
                </button>
                {/* Audio Element */}
                <audio 
                    ref={audioRef} 
                    src={audioSrc} 
                    onEnded={() => setIsPlaying(false)} 
                />
            </div>
        </div>
    );
};

export default MusicCard;
