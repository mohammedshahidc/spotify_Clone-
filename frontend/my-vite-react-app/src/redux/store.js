import {configureStore} from'@reduxjs/toolkit'
import playlistSlice from './slices/playlistSlice'
import songSlice from './slices/songSlice'
import albumSlice from './slices/albumSlice'
import loginSlice from './slices/loginSlice'
import artistSlice from './slices/artist.slice'
import favouriteSlice from './slices/favouriteSlice'
import userplaylistSlice from './slices/userplaylistSlice'




 const store=configureStore({
    reducer:{
        playlist:playlistSlice,
        song:songSlice,
        albums:albumSlice,
        user:loginSlice,
        artist:artistSlice,
        favourite:favouriteSlice,
        userplaylist:userplaylistSlice
    }
})

export default store