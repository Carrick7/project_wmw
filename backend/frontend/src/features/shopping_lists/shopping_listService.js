//Used for HTTP requests and sending data to the server
import { axiosInstance } from '../../axios';
// targetting all the shopping lists
const API_URL = '/api/shopping_lists/';

// Create a new shopping list
const createShoppingList = async (shopping_listData, token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axiosInstance.post(API_URL, shopping_listData, config);
    return response.data;
}

// getAllShoppingLists
const getAllShoppingLists = async (token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axiosInstance.get(API_URL, config);
    return response.data

}

// Delete a shopping list
const deleteShoppingList = async (shopping_list_id, token) => {
  // Looking for the token in the localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axiosInstance.delete(API_URL + shopping_list_id, config);
    return response.data;
}

const shopping_listService = {
  createShoppingList,
  getAllShoppingLists,
  deleteShoppingList,
}

export default shopping_listService;