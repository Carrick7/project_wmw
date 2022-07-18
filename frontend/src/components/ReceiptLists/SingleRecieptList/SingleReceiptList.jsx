import { useEffect,useState } from "react"
//Router Dom
import { useLocation, useNavigate } from 'react-router-dom';
//axios
import axios from 'axios';
//Components
import RemoveItemReceiptList from "../UpdateReceiptList/RemoveItemReceiptList";
import AddItemReceiptList from "../UpdateReceiptList/AddItemReceiptList";
import GetSingleProduct from "../../AllProducts/GetSingleProduct/GetSingleProduct";
import NewProduct from "../../AllProducts/NewProduct/NewProduct";
//Slices/Redux
import {  useSelector } from "react-redux";
//Toast Errors
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col } from 'react-bootstrap';
import './SingleReceiptList.css';

const SingleReceiptList = () => {

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

  // useEffect to run the getSingleList function whnever the path name & item_info changes
  useEffect(() => {
    getSingleList();
  }, [path, item_info]);

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

        {/* Add Item */}
        <AddItemReceiptList receiptListData={receiptListData}/>
          <br />
          <hr />
          <br />

        {/*Get Single Product*/}
        <GetSingleProduct />
          <br />
          <hr />
          <br />
          {/*Get Single Product, this will be a tab that can be open up*/}
          <NewProduct />
      </>
    )
  }
}

export default SingleReceiptList