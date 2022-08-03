//Used for HTTP requests and sending data to the server
import { axiosInstance } from '../../axios';
// targetting all the receipt lists
const API_URL = '/api/all_products/';

// createProduct
const createProduct = async (productData, token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axiosInstance.post(API_URL, productData, config);
  return response.data;
}

// getAllProducts
const getAllProducts = async (token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axiosInstance.get(API_URL, config);
  return response.data;
}

const receipt_listService = {
  createProduct,
  getAllProducts,
}

export default receipt_listService