import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { deleteShoppingList } from "../../../features/shopping_lists/shopping_listSlice";
import AddItemShoppingList from "./AddItemShoppingList";
import RemoveItemShoppingList from "./RemoveItemShoppingList";

const SingleShoppinngList = () => {

  //useState for shopping list data
  const [shoppingListData, setShoppingListData] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialise Navigate
  const navigate = useNavigate();

  //Isolating ID from URL
  const path = useLocation().pathname.split("/")[2];

  //fething user data (profile)
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  //setting up header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  // axios get request to get the shopping list
  const getSingleList = async () => {
    try {
      const response = await axios.get(`/api/shopping_lists/${path}`, config);
      const res = response.data
      setShoppingListData(res);
      setLoading(true);
    } catch (error) {
      toast.error(error.response.data.message + ' Please try again.');
      navigate('/');
    }
  }

  // useEffect to run the getSingleList function 
  useEffect(() => {
    getSingleList();
  }, [path, shoppingListData]);

  // initializing the dispatch function
  const dispatch = useDispatch();

  //Settin 
  const product_info = shoppingListData.product_info;
  const shopping_list_id = shoppingListData._id;

  if(loading) {
    return (
      <Container>
        <Row>
          <Col>
           <h1>{shoppingListData.title}</h1>
           <Link to={{pathname:`/shopping_lists`}}><button onClick={() => dispatch(deleteShoppingList(shoppingListData._id))}> X </button></Link>

        {/* Product Listings */}
        {product_info.map((product) => {
          return (
            <Col key={product._id}>
              { product.product_name } - { product.quantity } - <RemoveItemShoppingList product={product} shopping_list_id={shopping_list_id}/>
            </Col>
            
          )
        })}
          </Col>

          {/* Add Products */}
          <AddItemShoppingList shoppingListData={shoppingListData}/>
          


        </Row>
      </Container>
    )
  }
  }  
export default SingleShoppinngList
