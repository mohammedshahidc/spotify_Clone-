import React from 'react'
import Artist from './Artist'
import Navbar from './Navbar'
import Playlist from './Playlist'
import Album from './Album'
import Sidebar from './Sidebar'
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
      <div className='w-1/5'>
        <Sidebar />
      </div>

      <div className='w-full overflow-y-auto h-screen'>
        <Playlist />
        <Artist />
        <Album />
      </div>
      </div>

   


    </div>
  )
}

export default Home
