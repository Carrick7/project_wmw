import { useRef, useState, useEffect } from 'react'
//axios
import axios from 'axios'
//helpers
import { shops } from '../../../helpers/helpers';
//redux
import { useSelector } from 'react-redux'
//Components 
import AddItemReceiptListViaFindProduct from "../../ReceiptLists/UpdateReceiptList/AddItemReceiptListViaFindProduct";
//Toast 
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col, Form } from 'react-bootstrap';
import './GetSingleProduct.css';
import UpdateProductPrice from '../UpdateProductPrice/UpdateProductPrice';

const GetSingleProduct = () => {

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
      const res = await axios.get(`/api/all_products/${find_barcode.current.value}/${find_shop.current.value}`, config);
      const result = res.data;
      setProductData(result);
      setProductNames(result.product_names[0]);      
      //getting latest price
      const latestPrice = result.historical_prices[result.historical_prices.length - 1];
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
  
  //testing purposes to view product data
  useEffect(() => {
    console.log(productData);
    console.log(productNames);
    console.log(historicalPrices);
    }, []);

  return (
    <Container>
      {/* Find Product Title */}
      <section>
        <Col>
          <h1>Find &amp; Add Products to your Receipt List</h1>
          <span>Enter the barcode and shop to fetch the product</span>
        </Col>
      </section>
      {/* Input Fields (form) */}
      <section>
        <form onSubmit={onSubmit}>
          {/* barcode */}
          <Col className='rl_form_input'>      
            <input type="number" id='barcode' name='barcode' ref={find_barcode} placeholder='123456789101'/>
          </Col>
          {/* shop */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >Choose Shop</Form.Label>
              <Form.Select id='shop' name='shop' ref={find_shop}>
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
          <Col>
            <button onClick={onSubmit} className='btn btn-primary'>Find</button>
          </Col>                               
        </form>
      </section>
      <hr />
      {/* Adding Product to the receipt list form */}
      <span> If all the information below is correct, enter the quantity and click on Submit</span>
      <AddItemReceiptListViaFindProduct 
        productData={productData} 
        productNames={productNames} 
        historicalPrices={historicalPrices}
      />{/* */}
      <hr />
      {/* Update Product Price */}
      <UpdateProductPrice productData={productData} productNames={productNames}/>
    </Container>
  )
}

export default GetSingleProduct