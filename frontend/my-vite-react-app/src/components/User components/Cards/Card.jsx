import React from "react";

const Card = ({ image, title, artist, id }) => {
    return (
        <div className="relative bg-stone-900 text-white p-3 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-full sm:w-64 md:w-72 lg:w-80">
           
            <div className="absolute top-2 right-2 cursor-pointer text-gray-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-00 hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15l9-6-9-6-9 6 9 6z"
                    />
                </svg>
            </div>

            <img
                src={image}
                alt={title}
                className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover p-1"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-400 truncate">{artist}</p>
            </div>
        </div>
    );
};

export default Card;
