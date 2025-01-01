// AdminHome.js
import React from 'react';
import Navbar from '../../components/User components/Layout/Navbar/Navbar';
import AdminSidebar from './AdminSidebar';
import Dashboard from '../Dashboard';

const AdminHome = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden"> {/* Change here */}
      <Navbar />
      <div className=" w-full flex h-screen fixed"> {/* Change here */}
        <AdminSidebar />
        <main className="flex-1 w-full p-6 bg-black text-green-400 h-screen overflow-y-auto"> {/* Add overflow-y-scroll here */}
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
