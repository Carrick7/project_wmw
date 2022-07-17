import { useEffect, useState } from "react";
// Slice/Redux import
import { useSelector } from "react-redux";
//Router Dom import
import { useNavigate, useLocation, Link } from "react-router-dom"
// Components imports
import AddItemShoppingList from "../UpdateShoppingList/AddItemShoppingList";
import RemoveItemShoppingList from "../UpdateShoppingList/RemoveItemShoppingList";
//Axios
import axios from "axios";
//Toast Errors
import { toast } from 'react-toastify';
//CSS import
import { Container, Row, Col } from "react-bootstrap";

const SingleShoppingList = () => {

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

  // useEffect to run the getSingleList function whnever the path name & product_info changes
  useEffect(() => {
    getSingleList();
  }, [path, product_info]);

  if(loading) {
    return (
      <Container>
        <Row>
          <Col>
           <h1>{shoppingListData.title}</h1>

        {/* Product Listings */}
        {product_info.map((product) => {
          return (
            <Col key={product._id}>
              { product.product_name } - { product.quantity } - 
              <RemoveItemShoppingList product={product} shopping_list_id={shopping_list_id} shopping_list_name={shopping_list_name}/>
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
export default SingleShoppingList
