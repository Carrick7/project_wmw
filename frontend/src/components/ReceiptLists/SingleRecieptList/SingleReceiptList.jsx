import { useEffect, useState } from "react"
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
//Toast Errors
import { toast } from 'react-toastify';
//CSS
import { Container, Col, Tabs, Tab, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
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
          <Container fluid className='main_container' xxl={12}>
            <Col>
              <h1 className="single_page_title">{receiptListData.list_name}</h1>
            </Col>

            {/* Tabs */}
            <Tabs
              defaultActiveKey="all_products_receipt"
              id="single_receipt_tabs"
              className="mb-1"
              justify
            >
              {/*Get Single Product And Add*/}
              <Tab eventKey="add_product_receipt" title=" Add Product" className="adsasda">   
                <GetSingleProduct/>
              </Tab>

              {/* Showing Each Item in the receipt list */}
              <Tab eventKey="all_products_receipt" title="Logged Products">
                <h1 className='viewing_items_title'> 
                  Products in 
                  <span className="capatilise_sReceipt"> {receiptListData.list_name} </span>
                  <span> <FontAwesomeIcon icon={faCartShopping} className="cart"/> </span>  
                </h1>
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
              </Tab>

              {/* Creating a new product to be added to database*/}
              <Tab eventKey="create_new_product" title=" Create Product ">
                <NewProduct />
              </Tab>

              {/* Getting the single user stats */}
              <Tab eventKey="receipt_stats" title=" Receipt Info ">
                <SingleReceiptCost receiptListData={receiptListData}/>
              </Tab>
            </Tabs>



          </Container>
      </>
    )
  }
}

export default SingleReceiptList