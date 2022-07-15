import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from "react-router-dom"
import { toast } from 'react-toastify';
import axios from 'axios';
//CSS
import './UpdateShoppingList.css';


function RemoveItemShoppingList( {product, shopping_list_id} ) {

//fething user data (profile) & setting up header
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }  
  //Isolating product ID from URL
  const product_path = useLocation().pathname.split("/")[4];

  // useState for shopping list data
  const [targetId, setTargetId ] = useState(null);
  const [ deletedItem , setDeletedItem ] = useState(null);

  // formatting user input to JSON
  const formatData = (res) => { return JSON.stringify(res, null, 2); }

  // UseEffect to update the state of the taget ID with the product_path
  useEffect(() => {
    setTargetId(product_path);
  },[product_path]);

  //Delete Product 
  const deleteProduct = async () => {
    const deleted_item = {
      product_info : [{_id: targetId }]
  }
  try{
    const res = await axios.put(`/api/shopping_lists/${shopping_list_id}/remove_item`, deleted_item, config);
    const result = { data: res.data }
      setDeletedItem(formatData(result));
  }
  catch(error){
    toast.error(error.response.data.message + ' Please try again.');
  }
 }

 const onSubmit = (e) => {
  e.preventDefault();
  deleteProduct();
}
  return (
    <>
      <Link to={{pathname:`/shopping_lists/${shopping_list_id}/product/${product._id}`}}><button> Select {product.product_name}</button></Link> ||
      <button onClick={onSubmit}>Delete {product.product_name}</button> 
    </>
  )
}


export default RemoveItemShoppingList