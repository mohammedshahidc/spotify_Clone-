import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getfavourite } from '../redux/slices/favouriteSlice'

const Favourite = () => {
    const {favourite,status}=useSelector((state)=>state.favourite)
const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getfavourite())
    },[dispatch])
console.log("fav:",favourite);
    if(status=="pending"){
        return <p>loading.........</p>
    }
if(status=="rejected"){
    return <p>error...............</p>
}

  return (
    <div>
      
    </div>
  )
}

export default Favourite
