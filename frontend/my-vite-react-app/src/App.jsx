import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Otp from './components/Otp'


const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otp' element={<Otp/>} />
      </Routes>

    </div>
  )
}

export default App
