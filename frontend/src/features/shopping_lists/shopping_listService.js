//Used for HTTP requests and sending data to the server
import axios from 'axios';
const API_URL = '/api/shopping_lists/';

// Create a new shopping list
const createShoppingList = async (shopping_listData, token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL, shopping_listData, config);
  return response.data;
}

const shopping_listService = {
  createShoppingList,
}

export default shopping_listService;