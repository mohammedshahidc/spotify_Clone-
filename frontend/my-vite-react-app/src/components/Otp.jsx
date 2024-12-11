import React, { useState } from 'react';
import axiosInstance from '../../axiosinstance';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [responseMessage, setResponseMessage] = useState(''); // State for messages
    const [error, setError] = useState(''); // State for errors

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('otp:', otp);

        try {
            const response = await axiosInstance.put("/user/verifyotp", { otp });
            // Assuming the backend response contains a success message
            setResponseMessage(response.data.msg); // Success message
            console.log("resp:",response.data.msg);
            setError(''); // Clear any previous error
        } catch (error) {
            if (error.response) {
                // Handle error response from backend
                setError( 'Invalid OTP. Please try again.'); // Error message
                setResponseMessage(''); // Clear any previous success message
            } else {
                // Handle other errors (e.g., network issues)
                setError('An error occurred. Please try again.');
                setResponseMessage('');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                    alt="Spotify Logo"
                    className="w-20 mb-6 mx-auto"
                />
                <h2 className="text-2xl font-bold mb-4 text-center text-white">OTP Verification</h2>
                <p className='text-white p-4 text-sm'>Please check your email for the OTP</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id='otp'
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                    {responseMessage && <p className="text-green-500 text-sm mt-2 text-center">{responseMessage}</p>}
                    <button
                        className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none mt-4" 
                        type='submit'
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Otp;
