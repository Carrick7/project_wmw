import { useState, useEffect } from "react"
//helpers
import { shops, categories, onSale } from '../../../helpers/helpers';
// Axios
import axios from 'axios';
//Router Dom
import { useLocation } from 'react-router-dom';
//Redux/Slice
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../../features/counter/counterSlice';
//CSS
import { Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import './UpdateReceiptList.css';
//Toastify
import { toast } from 'react-toastify';

const AddItemReceiptList = ( { productData, productNames, historicalPrices } ) => {
  
  //initialise dispatch
  const dispatch = useDispatch();

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
        shop: '', 
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
     
    //useEffect 
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

  //Submit Button for adding item to receipt list and updating the state of counter
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(increment());
    addItemToReceipt();
  }    

  return (
    <>
        <section>
          <Col>
            <h1 className='viewing_items_title'>
              Product Details
              <span> <FontAwesomeIcon icon={faScroll} className="icon_orange"/> </span>
            </h1>
          </Col>

          <section className='formBody'>
            <form onSubmit={onSubmit}>
              
               {/* official name */}
              <Col className='space_between_inputs'>
                <span className='moving_input_titles'> Product Name </span>
                <input 
                  type="text" 
                  id='official_name'
                  className="form-control" 
                  name='official_name' 
                  value={productNames.official_name || ''} 
                  placeholder='No Name' 
                  onChange={onChange} 
                  disabled/>          
              </Col>

               {/* barcode */}
              <Col className='space_between_inputs'>
              <span className='moving_input_titles'> Barcode </span>
                <input 
                  type="number" 
                  id='barcode' 
                  name='barcode'
                  className="form-control"  
                  value={productData.barcode || ''} 
                  placeholder='No Barcode' 
                  onChange={onChange} 
                  disabled/>
              </Col>

               {/* shop */}
              <Col className='space_between_inputs'> 
                <Form.Group>
                  <Form.Label id='choice_product_details'><span className='moving_input_titles'> Shop </span></Form.Label>
                  <Form.Select id='product_details_shop' className="form-control" name='shop' value={productData.shop || ''} onChange={onChange} disabled>
                    {shops.map((shop, index) => {
                      return(
                      <option key={index}>
                        {shop.name}
                      </option>                    
                      )})}
                  </Form.Select>
                </Form.Group>
              </Col>

               {/* category */}
              <Col className='space_between_inputs'>
                <Form.Group>
                  <Form.Label id='choice_product_details2'><span className='moving_input_titles'> Category </span></Form.Label>
                  <Form.Select id='product_details_list_choices1' className="form-control" name='category' value={productData.category || ''} onChange={onChange} disabled>
                    {categories.map((category, index) => {
                      return(
                      <option key={index}>
                        {category.type}
                      </option>                    
                      )})}
                  </Form.Select>
                </Form.Group>                
              </Col>

               {/* on sale */}
              <Col className='space_between_inputs'>
                <Form.Group>
                  <Form.Label id='choice_product_details3'><span className='moving_input_titles'> Sale </span></Form.Label>
                  <Form.Select name='sale' value={historicalPrices.sale || ''} onChange={onChange} disabled id='product_details_list_choices2' className="form-control">
                    {onSale.map((sales, index) => {
                      return(
                      <option key={index}>
                        {sales.status}
                      </option>                    
                      )})}
                  </Form.Select>
                </Form.Group>
              </Col>

               {/* price per unit */}
              <Col className='space_between_inputs'>
                <span className='moving_input_titles'> Price Per Unit </span>
                <input 
                  type="number" 
                  step={0.01} 
                  id='price_per_unit' 
                  name='price_per_unit' 
                  value={historicalPrices.price_per_unit || ''} 
                  placeholder='No Price'
                  className="form-control"   
                  onChange={onChange} 
                  disabled/>          
              </Col>

               {/* quantity */}
              <Col className='space_between_inputs'>
               <span className='moving_input_titles'> Quantity </span>
               <input 
                type="number" 
                id='quantity' 
                name='quantity' 
                pattern="[0-9]+"
                className="form-control" 
                value={quantity_input || ''} 
                placeholder='Enter Quantity' 
                onChange={onChange}/>
              </Col>

              {/* submit button */}
              <Col className='space_between_inputs' id='add_product_button_position'>
                <button type='submit' className='white_bg_submit' id='add_product_button'> Add Product </button>
              </Col>
              
            </form>
          </section> 
        </section>
    </>
  )
}

export default AddItemReceiptList