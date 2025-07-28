import axios from "axios";

const token=localStorage.getItem('token')

console.log(token);
const axiosInstance=axios.create({
    // baseURL:'https://spotify-clone-rtqp.onrender.com',
    baseURL:'http://localhost:3001',
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export default axiosInstance