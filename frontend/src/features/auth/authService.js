//Used for HTTP requests and sending data to the server
import axios from 'axios';

const API_URL = '/api/users/';

// Register User
const register = async (userData) => {
 const response = await axios.post(API_URL, userData);

 //checking if data is there and if it is the data is set in local storage
 if(response.data){
  localStorage.setItem('user', JSON.stringify(response.data));
 }

 return response.data;
}

 const authService = {
  register
 }

export default authService;