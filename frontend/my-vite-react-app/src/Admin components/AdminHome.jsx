import React from 'react'
import Navbar from '../components/User components/Layout/Navbar/Navbar'
import AdminSidebar from './AdminSidebar'
import Dashboard from './Dashboard'

const AdminHome = () => {
  return (
    <div className='w-full bg-black'>
      <Navbar/>
      <div className='flex'>
        <AdminSidebar/>
        <Dashboard/>
      <div>

      </div>
      </div>
    </div>
  )
}

export default AdminHome
