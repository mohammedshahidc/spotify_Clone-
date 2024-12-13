import React, { useState } from 'react';
import { schema } from '../Schema';
import { useFormik } from 'formik';
import axiosInstance from '../../axiosinstance';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  cpassword: '',
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate()
  const { errors, values, handleBlur, handleChange, handleSubmit,resetForm } = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await axiosInstance.post('/user/register', values);
        alert('Registration successful!');
        resetForm()
        navigate("/otp")
        console.log(response.data);
      } catch (error) {
        setApiError(error.response?.data?.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center sm">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify Logo"
          className="w-20 mb-6 mx-auto"
        />
        <h1 className="text-3xl font-bold">Sign up to start listening</h1>
      </div>

      <form className="mt-8 w-full max-w-sm" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-sm mb-2 font-semibold">
          Username
        </label>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
          className="w-full px-4 py-2 mb-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors?.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}

        <label htmlFor="email" className="block text-sm mb-2 font-semibold">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="name@domain.com"
          className="w-full px-4 py-2 mb-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        <label htmlFor="password" className="block text-sm mb-2 font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter a strong password"
          className="w-full px-4 py-2 mb-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors?.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        <label htmlFor="cpassword" className="block text-sm mb-2 font-semibold">
          Confirm Password
        </label>
        <input
          type="password"
          id="cpassword"
          value={values.cpassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm your password"
          className="w-full px-4 py-2 mb-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors?.cpassword && (
          <p className="text-red-500 text-sm mt-1">{errors.cpassword}</p>
        )}

        {apiError && (
          <p className="text-red-500 text-sm mt-2">{apiError}</p>
        )}

        <button
          type="submit"
          className={`w-full py-2 rounded-md font-semibold text-white ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            }`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Next'}
        </button>
      </form>
    </div>
  );
};

export default Register;
