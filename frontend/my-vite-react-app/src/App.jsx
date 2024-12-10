import React from 'react'
import Navbar from './components/Navbar'
import WithoutLogin from './components/WithoutLogin'
import Register from './components/Register'

const App = () => {
  return (
    <div>
      <Navbar/>
      <WithoutLogin/>
      <Register/>
    </div>
  )
}

export default App
