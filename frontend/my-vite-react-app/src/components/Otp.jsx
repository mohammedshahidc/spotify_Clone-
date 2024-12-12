import React, { useState } from 'react';
import axiosInstance from '../../axiosinstance';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('otp:', otp);

        try {
            const response = await axiosInstance.put("/user/verifyotp", { otp });
        
            setResponseMessage(response.data.msg); 
            console.log("resp:",response.data.msg);
            setError(''); 
        } catch (error) {
            if (error.response) {
                
                setError( 'Invalid OTP. Please try again.'); 
                setResponseMessage(''); 
            } else {
                
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
                    onChange={(e)=>setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none mt-4"
                    type='submit'>
                    Verify OTP
                </button>
            </form>
            {responseMessage && (
                    <div className="mt-4 text-green-400 text-sm text-center">
                        {responseMessage}
                    </div>
                )}
                {error && (
                    <div className="mt-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
        </div>
    </div>
    );
};

export default Otp;
