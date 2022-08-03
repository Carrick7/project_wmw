import { useRef, useState, useEffect } from 'react'
//axios
import { axiosInstance } from '../../../axios';
//helpers
import { shops } from '../../../helpers/helpers';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from "../../../features/products/productSlice";
//Components 
import AddItemReceiptListViaFindProduct from "../../ReceiptLists/UpdateReceiptList/AddItemReceiptListViaFindProduct";
import UpdateProductPrice from '../UpdateProductPrice/UpdateProductPrice';
//Toast 
import { toast } from 'react-toastify';
//CSS
import { Row, Col, Form } from 'react-bootstrap';
import './GetSingleProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const GetSingleProduct = () => {

  //Search Bar for Barcode
  //initialise dispatch
  const dispatch = useDispatch();
  //useState for barcode
  const [ digits, setDigits ] = useState([]);
  const [ suggestions, setSuggestions ] = useState([]);

  //redux store
  const { products } = useSelector((state) => state.products);  

  //useEffect for getting all products
  useEffect(() => {   
    dispatch(getAllProducts());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, products.length]);

  const suggestionHandler = (digits) => {
    setDigits(digits);
    setSuggestions([]);
    // eslint-disable-next-line no-restricted-syntax
  }

  const onChange = (digits) => { 
    let allBarcodes = [];
    if(digits.length > 0) {
      allBarcodes = products.filter(product => {
        const regex = new RegExp(`${digits}`);
         return product.barcode.match(regex);
      })
    }
    setSuggestions(allBarcodes);
    setDigits(digits);
  }

  //fething user data (profile) & setting up header
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
     Authorization: `Bearer ${token}`,
    }
  }

  //setting up for useRef
  const find_barcode = useRef(null);
  const find_shop = useRef(null);

  //useState for product data
  const [productData, setProductData] = useState({});
  //historical prices
  const [historicalPrices, setHistoricalPrices] = useState([]);
  //official name
  const [productNames, setProductNames] = useState({});
  
  //getting the product from db
  const getProduct = async () => {
    try {
      const res = await axiosInstance.get(`/api/all_products/${find_barcode.current.value}/${find_shop.current.value}`, config);
      const result = res.data;
      setProductData(result);
      setProductNames(result.product_names[0]);      
      const latestPrice = result.historical_prices[result.historical_prices.length - 1]; //gets latest price
      setHistoricalPrices(latestPrice);
    }
    catch (error) {
      if(find_barcode.current.value === ''){
        toast.error('No barcode entered. Please try again.');
      }
      else{
        toast.error(error.response.data.message + ' Please try again.');
      }
     }
  }

  //Submit Button
  const onSubmit = (e) => {
    e.preventDefault();
    getProduct(); 
  } 
  
  return (
    <>
     <Row>
      {/* Find Product Title */}
      <Col sm={6}>
        <Col className='text_in_find_product' >
          <h1 className='viewing_items_title'> Find Product <FontAwesomeIcon icon={faMagnifyingGlass} className="icon_orange"/></h1>
          <span className='main_text' > 
            Enter the barcode and shop to fetch your product from the database. 
          </span>
        </Col>
      
      {/* Input Fields (form) */}
        <form onSubmit={onSubmit}>
          {/* barcode */}
           <Col className='space_between_inputs'>      
              <span className='moving_input_titles'> Barcode </span>
              <input
                type="text"
                ref={find_barcode} 
                placeholder='123456789101' 
                className="form-control" 
                onChange={e=>onChange(e.target.value)}
                value={digits}
                />
                <Col className='suggestion_col_main'>
                  {suggestions && suggestions.map((suggestion) => 
                    <Col key={suggestion._id} className='suggestion_col'>
                      <Col className='moving_suggestion_cols' onClick={() => {suggestionHandler(suggestion.barcode)}}>{suggestion.barcode}</Col>
                    </Col>
                  )}
                </Col>  
           </Col> 

          {/* shop */}
          <Col className='space_between_inputs'>
            <Form.Group>
              <Form.Label id='choice_remove_margin_bottom'><span className='moving_input_titles'> Choose Shop </span></Form.Label>
              <Form.Select name='shop' ref={find_shop} id='form_list_choices' className="form-control">
                {shops.map((shop, index) => {
                  return(
                  <option key={index}>
                    {shop.name}
                  </option>                    
                  )})}
              </Form.Select>
            </Form.Group>
          </Col>
          
          {/* submit button */}
          <Col className='space_between_inputs' id='find_product_button_position'>
            <button onClick={onSubmit} className='white_bg_submit' id='find_product_button'>Find</button>
          </Col>                               
        </form>

        {/* Find Product instructions */}
        <Col className='text_in_find_product'>
          <span className='main_text' > 
            If the item exists, the product details will be displayed in the Product Details section. 
            Check the information to ensure that everything is correct. 
            <br /><br />
            If all the information is correct, enter the quantity and click on the Add Product button.
            <br /><br />
            If the item does not exist, you can click on the Create Product tab where you can register any product to the database.
            <br /><br />
            if the item's price does not match what you payed for, you can update the price in the Update Product Price tab.
          </span>
        </Col>
      </Col>
     
      {/* Adding Product to the receipt list form */}
      <Col sm={6}>
        <AddItemReceiptListViaFindProduct 
          productData={productData} 
          productNames={productNames} 
          historicalPrices={historicalPrices}
      />
       </Col>
     </Row> 
     
     {/* Update Product Price */}
     <Col lg={6}>
      <UpdateProductPrice productData={productData} productNames={productNames}/>
     </Col>
    </>
  )
}

export default GetSingleProduct