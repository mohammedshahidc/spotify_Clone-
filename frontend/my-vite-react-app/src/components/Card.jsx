import React from "react";

const Card = ({ image, title, artist }) => {
  return (
    <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden">
      {/* Album Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-400 truncate">{artist}</p>
      </div>
    </div>
  );
};

export default Card;
