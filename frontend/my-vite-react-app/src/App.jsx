
import { Route, Routes } from 'react-router-dom'
import Home from './components/User components/Layout/Home'
import Register from './components/User components/Pages/Register'
import Otp from './components/User components/Pages/Otp'
import Login from './components/User components/Pages/Login'
import ProtectedRouter from './Protectedrouter/ProtectedRouter'
import PlaylistComponent from './components/User components/Music controllers/PlaylistComponent'
import Likedsong from './components/User components/Likedsong'

import Mobliesearch from './components/User components/Layout/Mobliesearch'
import MusicController from './components/User components/Music controllers/Musicplayer'
import Profile from './components/User components/Profile'
import AdminHome from './Admin components/Admin layouts/AdminHome'
import AdminLogin from './Admin components/Adminpages/AdminLogin'
import { useSelector } from 'react-redux'
import AdminUsers from './Admin components/AdminUsers'
import Adminsong from './Admin components/Adminsong'
import AdminUserprofile from './Admin components/AdminUserprofile'
import Addsong from './Admin components/Addsong'
import Editsongs from './Admin components/Editsongs'



const App = () => {
  const isAdmin=useSelector((state)=>state.admin.admin)
  
  return (
    <div>
  
     {!isAdmin ||isAdmin==null?( <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<ProtectedRouter><Register /></ProtectedRouter>} />
        <Route path='/otp' element={<ProtectedRouter><Otp/></ProtectedRouter>} />
        <Route path='/login' element={<ProtectedRouter><Login/></ProtectedRouter>}/>
        <Route path='/playlist/playlcomponent/:id' element={<PlaylistComponent/>}/>
        <Route path='/artist/playlcomponent/:artist' element={<PlaylistComponent/>}/>
        <Route path='/albums/playlcomponent/:albumid' element={<PlaylistComponent/>}/>
        <Route path='/likedsongs' element={<Likedsong/>} />
        <Route path='/search' element={<Mobliesearch/>} />
        <Route path='/playcomponent/:id1/:id2' element={<MusicController/>}/>
        <Route path='/artist/playcomponent/:id1/:id2' element={<MusicController/>}/>
        <Route path='/albums/playcomponent/:id1/:id2' element={<MusicController/>}/>
        <Route path='/likedsongs/playcomponent/:id1/:id2' element={<MusicController/>}/>
        <Route path='/userplaylist/playcomponent/:userplaylists' element={<PlaylistComponent/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
      </Routes>):(
        <Routes>
        <Route path='/admin' element={<AdminHome/>}/>
       <Route path='/admin/users' element={<AdminUsers/>}/>
       <Route path='/admin/songs' element={<Adminsong/>}/>
       <Route path='/admin/userprofile/:id' element={<AdminUserprofile/>}/>
       <Route path='/admin/songs/addsongs' element={<Addsong/>}/>
       <Route path='/admin/songs/editsong/:id' element={<Editsongs/>}/>
        </Routes>
      )}
     

    </div>
  )
}

export default App
