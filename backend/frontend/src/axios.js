import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://app-watchmywallet.herokuapp.com/',
}); 