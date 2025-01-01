import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AdminUserprofile = () => {
    // Assuming you have a selector to get user details by ID
    const{id}=useParams()
    const user = useSelector((state) =>
        state.allusers.allusers.find((user) => user.id === id)
    );

    if (!user) {
        return <div className="text-white">User not found</div>;
    }

    const { name, email, profileImage, likedSongs } = user;

    return (
        <div className="bg-green-900 p-6 rounded shadow-lg text-white max-w-md mx-auto">
            <div className="flex items-center mb-4">
                <img
                    src={profileImage}
                    alt={`${name}'s profile`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-sm">{email}</p>
                </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Liked Songs:</h3>
            {likedSongs.length > 0 ? (
                <ul className="list-disc list-inside">
                    {likedSongs.map((song, index) => (
                        <li key={index} className="text-sm">
                            {song.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm">No liked songs</p>
            )}
        </div>
    );
};

export default AdminUserprofile;
