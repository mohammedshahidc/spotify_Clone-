import React, { useEffect } from 'react'
import { getplaylist } from '../redux/slices/playlistSlice'
import { useSelector,useDispatch } from 'react-redux'


const WithoutLogin = () => {
    const disptch=useDispatch()
const playlist=useSelector((state)=>state)
console.log("state:",playlist);
    useEffect(()=>{
        disptch(getplaylist())
    },[])
  return (
    <div>
      
    </div>
  )
}

export default WithoutLogin
