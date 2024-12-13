import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRouter = ({children}) => {

    const navigate=useNavigate()
    const user=useSelector((state)=>state.user.user)
    console.log("user in prote:",user);
    if(user){
        return <Navigate to={'/'}/>
    }
  return (
    children
  )
}

export default ProtectedRouter
