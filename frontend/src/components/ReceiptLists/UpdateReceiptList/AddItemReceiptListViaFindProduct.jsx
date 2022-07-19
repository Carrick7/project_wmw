import { useState, useEffect } from "react"
//helpers
import { shops, categories, onSale } from '../../../helpers/helpers';
// Axios
import axios from 'axios';
//Router Dom
import { useLocation } from 'react-router-dom';
//Redux/Slice
import { useSelector } from 'react-redux';
//CSS
import { Container, Row, Col, Form } from 'react-bootstrap';
//Toastify
import { toast } from 'react-toastify';

const AddItemReceiptList = ( { productData, productNames, historicalPrices } ) => {
    
  //fething user data (profile) & setting up header
    const { user } = useSelector((state) => state.auth);
    const token = user.token;
    const config = {
      headers: {
       Authorization: `Bearer ${token}`,
      }
    } 

    //set up for useState
    const [ updateResult , setUpdatedResult ] = useState(null);
    
    // formatting user input to JSON
    const formatData = (res) => { return JSON.stringify(res, null, 2); }

    //Isolating receipt ID from URL
    const path = useLocation().pathname.split("/")[2];  
      
    // useState for quantity
    const [quantity_input, setQuantityInput] = useState('');
    
    //useState for product data
    const [item_info, setItemInfo] = useState({
      item_info: [{
        barcode: '',
        official_name: '',
        category: '',
        shop: productData.shop,
        price_per_unit: '',
        quantity:'',
        sale: ''
      }]      
    });

    //Setting up the fetched product details
    const barcode = productData.barcode;
    const official_name = productNames.official_name;
    const category = productData.category;
    const shop = productData.shop;
    const price_per_unit = historicalPrices.price_per_unit;
    const sale = historicalPrices.sale;

    // onChange function for the form data
  const onChange = (e) => {
    setQuantityInput(e.target.value);
    setUpdatedResult((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
      }));
    }      
     
    //useEffect for troubleshooting
    useEffect(() => {
      setItemInfo({
        item_info: [{
          barcode: barcode,
          official_name: official_name,
          category: category,
          shop: shop,
          price_per_unit: price_per_unit,
          quantity:quantity_input,
          sale: sale
        }] 
      })
    } , [quantity_input, barcode, official_name, category, shop, price_per_unit, sale]);   

    // Add Item to Receipt List useState
    const addItemToReceipt = async () => {
      try {
        const res = await axios.put(`/api/receipt_lists/` + path + '/', item_info, config);
        const result = { data: res.data };
        setUpdatedResult(formatData(result));
        toast.success(`${productNames.official_name} Added`);
      }
      catch (error) {
        toast.error(error.response.data.message + ' Please try again.');
      }
    }

  //Submit Button
  const onSubmit = (e) => {
    e.preventDefault();
    addItemToReceipt();
    console.log(item_info);
  }    

  return (
    <>
      {/* Add Item Receipt List Title useState*/}

      {/* Registration Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* barcode */}
          <Col className='rl_form_input'>      
            <input type="number" id='barcode' name='barcode' value={productData.barcode || ''} placeholder='Barcode' onChange={onChange} disabled/>
          </Col>          
          {/* official_name */}
          <Col className='rl_form_input'>
           <input type="text" id='official_name' name='official_name' value={productNames.official_name || ''} placeholder='Product Official Name' onChange={onChange} disabled/>          
          </Col>
          {/* category enum*/}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >Category</Form.Label>
              <Form.Select id='category' name='category' value={productData.category || ''} onChange={onChange} disabled>
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
              <Form.Label >Shop</Form.Label>
              <Form.Select id='shop' name='shop' value={productData.shop || ''} onChange={onChange} disabled>
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
            <input type="number" step={0.01} id='price_per_unit' name='price_per_unit' value={historicalPrices.price_per_unit || ''} placeholder='Price per Unit' onChange={onChange} disabled/>          
          </Col >
          {/* quantity */}
          <Col className='rl_form_input'>
            <input type="number" id='quantity' name='quantity' pattern="[0-9]+" value={quantity_input || ''} placeholder='Quantity' onChange={onChange}/>          
          </Col >
          {/* sale */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >On Sale?</Form.Label>
              <Form.Select id='sale' name='sale' value={historicalPrices.sale || ''} onChange={onChange} disabled>
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