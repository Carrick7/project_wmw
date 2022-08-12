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
import NotFound from "../../Spinner/NotFound/NotFound";
//Toast Errors
import { toast } from 'react-toastify';
//images
import img4 from '../../../images/img4.png'; 
//CSS
import { Container, Col, Tabs, Tab, Row, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';
import './SingleReceiptList.css';

const SingleReceiptList = () => {

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);

 //array for list item index
  const emptyArray = []; 

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
  //initialising the receipt lsit ID and the product info so they can be used for RemoveItemShoppingList
  const item_info = receiptListData.item_info;
  const receipt_list_id = receiptListData._id;
  const receipt_list_name = receiptListData.list_name;

  // axios get request to get the receipt list
  const getSingleList = async () => {
    try {
      const response = await axios.get(`/api/receipt_lists/${path}`, config);
      const res = response.data
      setReceiptListData(res);
      if(res.item_info.length > 0){
        setLoading(true);
      }
      else{
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message + ' Please try again.');
      navigate('/receipt_lists');
    }
  }

  // useEffect to run the getSingleList when the counter is increased. The counter is then set back to 0
  useEffect(() => {
    getSingleList();
   dispatch(reset_c());
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

return (
        <>
          <Container fluid className='main_container' xxl={12}>
            <Col>
              <h1 className="single_page_title">{receiptListData.list_name}</h1>
            </Col>
            {/* Tabs */}
            <Tabs
              defaultActiveKey="add_product_receipt"
              id="single_receipt_tabs"
              className="mb-1"
              justify
            >
        
             {/* Showing Each Item in the receipt list */}
             <Tab eventKey="all_products_receipt" title="Logged Products">
              <Row>
                <Col xxl={9}>
                  <h1 className='viewing_items_title'> 
                    Products in 
                    <span className="capatilise_sReceipt"> {receiptListData.list_name} </span>
                    <span> <FontAwesomeIcon icon={faPepperHot} className="icon_orange"/> </span>  
                  </h1>
                  {loading ?  <>  
                  {item_info.map((item) => {
                    return (
                    <Col key={item._id} className="items_in_list" id='remove_pointer'>
                      <Row >
                       <Col sm={2} className='listing_products_single_receipt'>
                        <Row>
                          <Col sm={4} className='margin_bottom_index'>
                           {emptyArray.push(`${item._id}`)}.
                          </Col>  
                          <Col sm={8}>
                           {item.official_name}
                          </Col>  
                        </Row>
                       </Col>
                       <Col sm={2} className='listing_products_single_receipt'>
                       {item.shop}
                       </Col>
                       <Col sm={2} className='listing_products_single_receipt'>
                         Price Per Unit: €{item.price_per_unit} 
                       </Col>
                       <Col sm={2} className='listing_products_single_receipt'>
                         Quantity: {item.quantity} 
                       </Col>
                       <Col sm={2} className='listing_products_single_receipt'> 
                         Cost: €{Number(item.price_per_unit*item.quantity).toFixed(2)}
                       </Col>
                       <Col sm={2} className='listing_products_single_receipt' id='delete_button_position_receipt'>
                         {/* Delete Item */} 
                         <RemoveItemReceiptList item={item} receipt_list_id={receipt_list_id} receipt_list_name={receipt_list_name}/>
                       </Col>
                        <hr/>
                      </Row>
                    </Col>
                    )
                  })}  
                  {/* Showing Skull and Bones */}
                  </>
                  : <NotFound /> } 
                </Col>
            
                {/* Dougnut Chart for list*/}
                <Col xxl={3}>
                  {loading ?  
                    <SingleReceiptCost receiptListData={receiptListData}/>
                  : null }
                </Col>
              </Row>
             </Tab>
           
             {/*Get Single Product And Add*/}
             <Tab eventKey="add_product_receipt" title=" Add Product">
              <GetSingleProduct/>
             </Tab>
            
             {/* Creating a new product to be added to database*/}
             <Tab eventKey="create_new_product" title=" Create Product ">
              <Row>
                <Col xxl={7}>
               <NewProduct />                
                </Col>
                <Col xxl={5} className='centre_new_product_image'>
                  <img src={img4} alt="login_image" className='login_image' id='create_product_image'/>
                  <Col className='image_source_col'>  
                    <OverlayTrigger
                      trigger="click"
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Popover id={`popover-positioned-bottom`}>
                          <Popover.Body>
                          <a href="https://undraw.co/search" target={"_blank"} rel="noreferrer">Shopping App by unDraw</a>
                          </Popover.Body>
                        </Popover>
                      }>
                      <button className='image_source_login'>Image Source</button>
                    </OverlayTrigger>
                  </Col>
                </Col>
              </Row>
             </Tab>

           </Tabs>
          </Container>
        </>
    )
  
}

export default SingleReceiptList