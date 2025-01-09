import axios from "axios";

const token=localStorage.getItem('token')

console.log(token);
const axiosInstance=axios.create({
    baseURL:'https://spotify-clone-rtqp.onrender.com',
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export default axiosInstance