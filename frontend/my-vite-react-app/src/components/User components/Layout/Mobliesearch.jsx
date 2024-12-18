import React from 'react';
import Searchbar from './Navbar/Searchbar';

const Mobliesearch = () => {
  return (
    <div className="fixed inset-0 flex justify-center bg-stone-950 p-5 z-50">
      <div className="bg-stone-800 rounded-lg shadow-lg p-6 w-full max-w-md max-h-fit">
        <h2 className="text-white text-lg font-bold mb-4 text-center">Search</h2>
        <Searchbar />
      </div>
    </div>
  );
};

export default Mobliesearch;
