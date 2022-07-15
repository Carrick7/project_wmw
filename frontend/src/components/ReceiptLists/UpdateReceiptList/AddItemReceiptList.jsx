import { useState, useEffect } from "react"
//Components
import Spinner from '../../Spinner/Spinner';
//Router Dom
import { useNavigate } from 'react-router-dom';
//helpers
import { shops, categories, onSale } from '../../../helpers/helpers';
//Redux/Slice
import { useSelector, useDispatch } from 'react-redux';
import { addItemReceiptList, reset_rl } from "../../../features/receipt_lists/receipt_listSlice";
//CSS
import { Container, Row, Col, Form } from 'react-bootstrap';
//Toastify
import { toast } from 'react-toastify';

const AddItemReceiptList = ({}) => {
  const [ formData, setFormData ] = useState({
    item_info:[
               {
                  barcode: '',
                  official_name: '',
                  category: '',
                  shop: '',
                  price_per_unit:'',
                  quantity:'',
                  sale: ''
                }
              ]
  });

  //set the form data 
  const { barcode, official_name, category, shop, price_per_unit, quantity, sale } = formData; //formData.item_info[0] try this if the other fails

  //Initialise navigate & dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Getting receipt list state from the redux store
  const { receipt_lists, isLoading_rl, isError_rl, message_rl, isSuccess_rl } = useSelector((state) => state.receipt_lists);

  useEffect(() => {
    //if there is an error, display it
    if(isError_rl) {
      toast.error(message_rl + ' Please try again.');
    }
    //Spinner
    if(isLoading_rl) {
      return <Spinner />;
    }

  }, [isSuccess_rl, isError_rl, message_rl, navigate, dispatch]);

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
        <form >
          {/* barcode */}
          <Col className='rl_form_input'>      
            <input type="number" id='barcode' name='barcode' value={barcode} placeholder='123456789101'/>
          </Col>          
          {/* official_name */}
          <Col className='rl_form_input'>
           <input type="text" id='official_name' name='official_name' value={official_name} placeholder='Ivorian Bananas'/>          
          </Col>
          {/* category enum*/}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >Choose Category</Form.Label>
              <Form.Select id='category' name='category' value={category}>
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
              <Form.Select id='shop' name='shop' value={shop}>
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
            <input type="number" id='price_per_unit' name='price_per_unit' value={price_per_unit} placeholder='price_per_unit'/>          
          </Col >
          {/* quantity */}
          <Col className='rl_form_input'>
            <input type="number" id='quantity' name='quantity' value={quantity} placeholder='quantity'/>          
          </Col >
          {/* sale */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >On Sale?</Form.Label>
              <Form.Select id='sale' name='sale' value={sale}>
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