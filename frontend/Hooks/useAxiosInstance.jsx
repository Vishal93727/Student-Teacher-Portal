import axios from 'axios';
const userAxios= axios.create({
  baseURL:'http://localhost:5000/api/auth' ,// connect backend 
  withCredentials:true,
  headers:{
    'Content-Type':'application/json'
  }
});

const useAxiosInstance=()=>{
  return userAxios;
}
 
 export default useAxiosInstance;