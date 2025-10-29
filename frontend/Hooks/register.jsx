import useAxiosInstance from './useAxiosInstance';

const axiosInstance = useAxiosInstance();

export const registerUser = async (formData) => {
  try {
    // Determine role endpoint based on selected role
    const endpoint = formData.role === 'teacher' ? '/register/auth' : '/register/auth';

    // Send registration data
    const response = await axiosInstance.post(endpoint, formData);

    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: 'Server Error' }
    };
  }
};
