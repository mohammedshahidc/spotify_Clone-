import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Otp from './components/Otp'
import Login from './components/Login'
import ProtectedRouter from './Protectedrouter/ProtectedRouter'
import PlaylistComponent from './components/PlaylistComponent'


const App = () => {
  
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<ProtectedRouter><Register /></ProtectedRouter>} />
        <Route path='/otp' element={<ProtectedRouter><Otp/></ProtectedRouter>} />
        <Route path='/login' element={<ProtectedRouter><Login/></ProtectedRouter>}/>
        <Route path='/playlist/playlcomponent/:id' element={<PlaylistComponent/>}/>
        <Route path='/artist/playlcomponent/:artist' element={<PlaylistComponent/>}/>
        
      </Routes>

    </div>
  )
}

export default App
