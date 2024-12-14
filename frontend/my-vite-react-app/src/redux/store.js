import {configureStore} from'@reduxjs/toolkit'
import playlistSlice from './slices/playlistSlice'
import songSlice from './slices/songSlice'
import albumSlice from './slices/albumSlice'
import loginSlice from './slices/loginSlice'
import artistSlice from './slices/artist.slice'


 const store=configureStore({
    reducer:{
        playlist:playlistSlice,
        song:songSlice,
        albums:albumSlice,
        user:loginSlice,
        artist:artistSlice
    }
})

export default store