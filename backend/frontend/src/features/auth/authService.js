//Used for HTTP requests and sending data to the server
import { axiosInstance } from '../../axios';

const API_URL = '/api/users/';

// Register User
const register = async (userData) => {
 const response = await axiosInstance.post(API_URL, userData);
 //checking if data is there and if it is the data is set in local storage
 if(response.data){
  localStorage.setItem('user', JSON.stringify(response.data));
 }
 return response.data;
}

// Login User
const login = async (userData) => {
 const response = await axiosInstance.post(API_URL + 'login', userData);
 //checking if data is there and if it is the data is set in local storage
 if(response.data){
  localStorage.setItem('user', JSON.stringify(response.data));
 }
 return response.data;
}

// Logout User
const logout = () => {
  localStorage.removeItem('user');
}

 const authService = {
  register,
  logout,
  login
 }

export default authService;