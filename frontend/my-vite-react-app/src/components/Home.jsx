import React from 'react'
import Artist from './Artist'
import Navbar from './Navbar'
import Playlist from './Playlist'
import Album from './Album'
const Home = () => {
  return (
   <div>
    <Navbar />
  
        <Playlist />
    <Artist />
    <Album/>
   
</div>
  )
}

export default Home
