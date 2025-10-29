import AuthContext from '../AuthContext/AuthContext';
import useAxiosInstance from '../Hooks/useAxiosInstance'
const AuthProvider =({children})=>{
const axiosInstance=useAxiosInstance();


//const handleSubmited=async(req,res)=>{
  
//   try {
//     const res = await axiosInstance.post(url,body);
//     return{
//     status:res?.status,
//     user:res?.data?.user,
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// }
const handleSubmited = async (url, body) => {
  try {
    const res = await axiosInstance.post(url, body);
    return {
      status: res?.status,
      message: res?.data?.message,
      user: res?.data?.user,
    };
  } catch (error) {
    console.error("Error in handleSubmited:", error.message);
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || 'Something went wrong',
    };
  }
};

  return (
  <AuthContext.Provider value={{
    handleSubmited
  }}>
  {children}
  </AuthContext.Provider>
  
  )
}

export default AuthProvider;