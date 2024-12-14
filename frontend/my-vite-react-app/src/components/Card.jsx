import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, title, artist,id }) => {
   
    return (
        // <Link to={`/playlcomponent/${id}`}>
        <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-full sm:w-64 md:w-72 lg:w-80">
            {/* Album Image */}
            <img src={image} alt={title} className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover p-1" />

            {/* Details */}
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-400 truncate">{artist}</p>
            </div>
        </div>
        // </Link>
    );
};

export default Card;
