import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MusicCard from './MusicCard'

const PlaylistComponent = () => {
    const playlist = useSelector((state) => state.playlist.playlist);
    console.log('ddv:',playlist[0].playlist);
  
   
    const{id}=useParams()
    console.log("id:",id);
    const filteredPlaylists =playlist[0].playlist.filter((item) => item._id == id);
    console.log('filtered playlists:', filteredPlaylists);
  return (
    <div>
      {filteredPlaylists &&(
        filteredPlaylists.map((item)=>(
            <MusicCard
            key={item._id} 
            image={item.image} 
            title={item.title}
            artist={item.artist}
            audioSrc={item.fileUrl} 
            
            />
        ))
      )}
    </div>
  )
}

export default PlaylistComponent
