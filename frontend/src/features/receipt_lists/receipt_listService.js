//Used for HTTP requests and sending data to the server
import axios from 'axios';
// targetting all the receipt lists
const API_URL = '/api/receipt_lists/';

// Create a new receipt List 
const createReceiptList = async (receipt_listData, token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL, receipt_listData, config);
   return response.data;
}

// getAllReceiptLists
const getAllReceiptLists = async (token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL, config);

      return response.data

}

// Delete a shopping list
const deleteReceiptList = async (receipt_list_id, token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.delete(API_URL + receipt_list_id, config);
   return response.data;
}

const receipt_listService = {
  createReceiptList,
  getAllReceiptLists,
  deleteReceiptList,
}

export default receipt_listService