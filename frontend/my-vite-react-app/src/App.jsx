
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



const App = () => {
  
  return (
    <div>
<MusicController/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<ProtectedRouter><Register /></ProtectedRouter>} />
        <Route path='/otp' element={<ProtectedRouter><Otp/></ProtectedRouter>} />
        <Route path='/login' element={<ProtectedRouter><Login/></ProtectedRouter>}/>
        <Route path='/playlist/playlcomponent/:id' element={<PlaylistComponent/>}/>
        <Route path='/artist/playlcomponent/:artist' element={<PlaylistComponent/>}/>
        <Route path='/albums/playlcomponent/:albumid' element={<PlaylistComponent/>}/>
        <Route path='/likedsongs' element={<Likedsong/>} />
        <Route path='/search' element={<Mobliesearch/>} />
      </Routes>

    </div>
  )
}

export default App
