import {configureStore} from'@reduxjs/toolkit'
import playlistSlice from './slices/playlistSlice'
import songSlice from './slices/songSlice'
import albumSlice from './slices/albumSlice'

 const store=configureStore({
    reducer:{
        playlist:playlistSlice,
        song:songSlice,
        albums:albumSlice
    }
})

export default store