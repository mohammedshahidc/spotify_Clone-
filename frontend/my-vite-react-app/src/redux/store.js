import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import playlistSlice from './slices/playlistSlice';
import songSlice from './slices/songSlice';
import albumSlice from './slices/albumSlice';
import loginSlice from './slices/loginSlice';
import artistSlice from './slices/artist.slice';
import favouriteSlice from './slices/favouriteSlice';
import userplaylistSlice from './slices/userplaylistSlice';
import adminloginSlice from './slices/admin slices/adminloginSlice';
import adminusersslice from './slices/admin slices/adminusersslice';
import AdminSongSlice from './slices/admin slices/AdminSongSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['admin','playlist','user'], 
};


const rootReducer = combineReducers({
  playlist: playlistSlice,
  song: songSlice,
  albums: albumSlice,
  user: loginSlice,
  artist: artistSlice,
  favourite: favouriteSlice,
  userplaylist: userplaylistSlice,
  admin: adminloginSlice,
  allusers:adminusersslice,
  adminSongs:AdminSongSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/FLUSH', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
});


export const persistor = persistStore(store);
export default store;
