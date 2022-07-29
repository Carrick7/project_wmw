import { useEffect, useState } from "react";
// Slice/Redux import
import { useSelector, useDispatch } from "react-redux";
import { reset_c } from '../../../features/counter/counterSlice';
//Router Dom import
import { useNavigate, useLocation } from "react-router-dom"
// Components imports
import AddItemShoppingList from "../UpdateShoppingList/AddItemShoppingList";
import RemoveItemShoppingList from "../UpdateShoppingList/RemoveItemShoppingList";
//Axios
import axios from "axios";
//Toast Errors
import { toast } from 'react-toastify';
//CSS import
import { Container, Col, Tabs, Tab, Row } from "react-bootstrap";
import './SingleShoppingList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
//helper function to check if the item is checked off
import {checkedOffList} from '../../../helpers/helperFunctions';

const SingleShoppingList = () => {

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);

  //initialise dispatch
  const dispatch = useDispatch();  

  //useState for shopping list data
  const [shoppingListData, setShoppingListData] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialise Navigate
  const navigate = useNavigate();

  //Isolating ID from URL
  const path = useLocation().pathname.split("/")[2];

  //fething user data (profile) and settin up header
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  // useEffect to run the getSingleList when the counter is increased. The counter is then set back to 0
  useEffect(() => {
    getSingleList();
    dispatch(reset_c());
  }, [count]);

  //initialising the shopping lsit ID and the product info so they can be used for RemoveItemShoppingList
  const product_info = shoppingListData.product_info;
  const shopping_list_id = shoppingListData._id;
  const shopping_list_name = shoppingListData.title;

  // axios get request to get the shopping list
  const getSingleList = async () => {
    try {
      const response = await axios.get(`/api/shopping_lists/${path}`, config);
      const res = response.data
      setShoppingListData(res);
      setLoading(true);
    } catch (error) {
      toast.error(error.response.data.message + ' Please try again.');
      navigate('/shopping_lists');
    }
  }

  if(loading) {
    return (
      <Container fluid id='sslist_container'>
        <Col>
          <h1 id="sslist_title" className="capatilise_sslist">{shoppingListData.title}</h1>
        </Col>
        
        <Tabs defaultActiveKey="add_products" id="testing" className="mb-3" justify>
          <Tab eventKey="add_products" title="Add Item">
            {/* Add Products */}
            <AddItemShoppingList shoppingListData={shoppingListData}/>
          </Tab>
         <Tab eventKey="products" title="Items">
            {/* Product Listings */}
            <h1 id='viewing_items_title'> 
              Items in 
              <span className="capatilise_sslist"> {shoppingListData.title} </span>
              <span> <FontAwesomeIcon icon={faCartShopping} className="cart"/> </span>  
            </h1>
              {product_info.map((product) => {
                return (
                  <Col 
                    key={product._id} 
                    onClick={checkedOffList}
                    id={`${product._id}`}
                    className="items_in_list"
                    >
                      <Row>
                        <Col xs={8}>
                          <span className="capatilise_sslist">
                          { product.product_name }
                          </span>
                        </Col>
                        <Col xs={2} className='centre_me_items'>
                        { product.quantity } 
                        </Col>
                        <Col xs={2} className='centre_me_items'> 
                        <RemoveItemShoppingList product={product} shopping_list_id={shopping_list_id} shopping_list_name={shopping_list_name}/>
                        </Col>
                      </Row>
                  <hr /> 
                  </Col>  
                )
              })}
          </Tab> 
        </Tabs>
      </Container>
    )
  }
}  
export default SingleShoppingList
// className={`items_in_list${product._id}`