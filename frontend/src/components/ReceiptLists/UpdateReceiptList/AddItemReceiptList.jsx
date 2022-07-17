import { useState, useRef } from "react"
//Components
import Spinner from '../../Spinner/Spinner';
//Router Dom
import { useNavigate } from 'react-router-dom';
//helpers
import { shops, categories, onSale } from '../../../helpers/helpers';
// Axios
import axios from 'axios';
//Redux/Slice
import { useSelector } from 'react-redux';
//CSS
import { Container, Row, Col, Form } from 'react-bootstrap';
//Toastify
import { toast } from 'react-toastify';

const AddItemReceiptList = ( {receiptListData} ) => {
    
  //fething user data (profile) & setting up header
    const { user } = useSelector((state) => state.auth);
    const token = user.token;
    const config = {
      headers: {
       Authorization: `Bearer ${token}`,
      }
    } 

    // setting up for useRef
    const barcode_input = useRef(null);
    const official_name_input = useRef(null);
    const category_input = useRef(null);
    const shop_input = useRef(null);
    const price_per_unit_input = useRef(null);
    const quantity_input = useRef(null);
    const sale_input = useRef(null);

    //set up for useState
    const [ updateResult , setUpdatedResult ] = useState(null);
    
    // formatting user input to JSON
    const formatData = (res) => { return JSON.stringify(res, null, 2); }

    // Add Item to Receipt List
    const addItemToReceipt = async () => {
      const addItem = {
        item_info: [{
             barcode: barcode_input.current.value,
             official_name: official_name_input.current.value,
             category: category_input.current.value,
             shop: shop_input.current.value,
             price_per_unit: price_per_unit_input.current.value,
             quantity:quantity_input.current.value,
             sale: sale_input.current.value
           }]        
      }
      try {
        const res = await axios.put(`/api/receipt_lists/${receiptListData._id}`, addItem, config);
        const result = { data: res.data };
        setUpdatedResult(formatData(result));
      }
      catch (error) {
        toast.error(error.response.data.message + ' Please try again.');
      }
    }

  //Submit Button
  const onSubmit = (e) => {
  e.preventDefault();
  addItemToReceipt();
  }    

  return (
    <>
      {/* Add Item Receipt List Title */}
      <section>
        <Col>
          <h1 className='rl_formTitle'>Add Item</h1>
          <span>Add a product to the </span>
        </Col>
      </section>
      {/* Registration Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* barcode */}
          <Col className='rl_form_input'>      
            <input type="number" id='barcode' name='barcode' ref={barcode_input} placeholder='123456789101'/>
          </Col>          
          {/* official_name */}
          <Col className='rl_form_input'>
           <input type="text" id='official_name' name='official_name' ref={official_name_input} placeholder='Ivorian Bananas'/>          
          </Col>
          {/* category enum*/}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >Choose Category</Form.Label>
              <Form.Select id='category' name='category' ref={category_input}>
                {categories.map((category, index) => {
                  return(
                  <option key={index}>
                    {category.type}
                  </option>                    
                  )})}
              </Form.Select>
            </Form.Group>
          </Col>          
          {/* shop */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >Choose Shop</Form.Label>
              <Form.Select id='shop' name='shop' ref={shop_input}>
                {shops.map((shop, index) => {
                  return(
                  <option key={index}>
                    {shop.name}
                  </option>                    
                  )})}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* price_per_unit */}
          <Col className='rl_form_input'>
            <input type="number" step={0.01} id='price_per_unit' name='price_per_unit' ref={price_per_unit_input} placeholder='price_per_unit'/>          
          </Col >
          {/* quantity */}
          <Col className='rl_form_input'>
            <input type="number" id='quantity' name='quantity' ref={quantity_input} placeholder='quantity'/>          
          </Col >
          {/* sale */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >On Sale?</Form.Label>
              <Form.Select id='sale' name='sale' ref={sale_input}>
                {onSale.map((sales, index) => {
                  return(
                  <option key={index}>
                    {sales.status}
                  </option>                    
                  )})}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* submit button */}
          <Col className='rl_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>
        </form>
      </section>
    </>
  )
}

export default AddItemReceiptList