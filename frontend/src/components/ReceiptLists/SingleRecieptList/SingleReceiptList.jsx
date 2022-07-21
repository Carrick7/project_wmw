import { useEffect,useState } from "react"
//Router Dom
import { useLocation, useNavigate } from 'react-router-dom';
//axios
import axios from 'axios';
//redux/slices
import { useSelector, useDispatch } from 'react-redux';
import { reset_c } from '../../../features/counter/counterSlice';
//Components
import RemoveItemReceiptList from "../UpdateReceiptList/RemoveItemReceiptList";
import GetSingleProduct from "../../AllProducts/GetSingleProduct/GetSingleProduct";
import NewProduct from "../../AllProducts/NewProduct/NewProduct";
import SingleReceiptCost from "../../UserStats/SingleReceiptCost/SingleReceiptCost";
import AddItemReceiptListViaFindProduct from "../UpdateReceiptList/AddItemReceiptListViaFindProduct";
//Toast Errors
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col } from 'react-bootstrap';
import './SingleReceiptList.css';

const SingleReceiptList = () => {

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);

  //initialise dispatch
  const dispatch = useDispatch();

  //useState for shopping list data
  const [receiptListData, setReceiptListData] = useState({});
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
    console.log(count);
  }, [count]);

  //initialising the shopping lsit ID and the product info so they can be used for RemoveItemShoppingList
  const item_info = receiptListData.item_info;
  const receipt_list_id = receiptListData._id;
  const receipt_list_name = receiptListData.list_name;

  // axios get request to get the shopping list
  const getSingleList = async () => {
    try {
      const response = await axios.get(`/api/receipt_lists/${path}`, config);
      const res = response.data
      setReceiptListData(res);
      setLoading(true);
    } catch (error) {
      toast.error(error.response.data.message + ' Please try again.');
      navigate('/receipt_lists');
    }
  }



  if(loading) {
    return (
      <>
        {/*Title & Delete button*/}
        <h1>{receiptListData.list_name}</h1>

        <Row>
          {item_info.map((item) => {
            return (
            <Col key={item._id}>
              <Col>
                Name: {item.official_name} ||
                Category: {item.category} ||
                Shop: {item.shop} ||
                Price: {item.price_per_unit} ||
                Quantity: {item.quantity} ||
                Barcode: {item.barcode} ||
                Sale: {item.sale}
              </Col>
              {/* Delete Item */}
              <RemoveItemReceiptList item={item} receipt_list_id={receipt_list_id} receipt_list_name={receipt_list_name}/>
            </Col>
            )
          })}
        </Row>
     
        {/*Get Single Product*/}
        <GetSingleProduct/>
          <br />
          <hr />
          <br />
          {/*Get Single Product, this will be a tab that can be open up*/}
          <NewProduct />
          <br />
          <hr />
          <br />
          {/* Single Receipt Cost */}
          <SingleReceiptCost receiptListData={receiptListData}/>
      </>
    )
  }
}

export default SingleReceiptList