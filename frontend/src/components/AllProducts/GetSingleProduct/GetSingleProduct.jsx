import { useRef, useState } from 'react'
//axios
import axios from 'axios'
//helpers
import { shops } from '../../../helpers/helpers';
//redux
import { useSelector } from 'react-redux'
//Toast 
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col, Form } from 'react-bootstrap';
import './GetSingleProduct.css';

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
  
  //getting the product from db
  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/all_products/${find_barcode.current.value}/${find_shop.current.value}`, config);
      const result = res.data;
      setProductData(result);
    }
    catch (error) {
      //error not working because the redux slice has not been made yet*******************************
      if(find_barcode.current.value===undefined){
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
    //testing purposes 
    console.log(productData);
  } 

  return (
    <Container>
      {/* Find Product Title */}
      <section>
        <Col>
          <h1>Find Product</h1>
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
            <button type='submit' className='btn btn-primary'>Find</button>
          </Col>                               
        </form>
      </section>
    </Container>
  )
}

export default GetSingleProduct