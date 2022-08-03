import { useState, useEffect } from 'react';
//Slice/Redux import
import { createProduct } from '../../../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux";
//Components
//helpers
import { shops, categories, onSale } from '../../../helpers/helpers';
//CSS
import { Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShrimp } from '@fortawesome/free-solid-svg-icons';
import './NewProduct.css';
//Toast Errors
import { toast } from 'react-toastify';
//helper
import { capitaliseMe } from '../../../helpers/helperFunctions';

const NewProduct = () => {
  //useState for form data
  const [formData, setFormData] = useState(
  {
    product_names: {
      generic_name: '',
      official_name: ''
    },
    category: '',
    historical_prices:[{
      sale: '',
      price_per_unit: ''
    }],
    shop: '',
    barcode: ''
  });

  //set the form data
  const { generic_name, official_name, category, sale, price_per_unit, shop, barcode } = formData;

  //initialize the dispatch 
  const dispatch = useDispatch();

  // getting the relevant product info from the redux store
  const { isError_p, isSuccess_p, message_p } = useSelector((state) => state.products);

  // onChange function for the form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  //clear the form data after submit
  const clearFormData = () => {
    setFormData({
      product_names: {
        generic_name: '',
        official_name: ''
      },
      category: '',
      historical_prices:[{
        sale: '',
        price_per_unit: ''
      }],
      shop: '',
      barcode: ''
    });
  }  

  // onSubmit function for the form data
  const onSubmit = (e) => {
    e.preventDefault();
    const productData = { 
      product_names: {
        generic_name,
        official_name
      },
      category,
      historical_prices:[{
        sale,
        price_per_unit
      }],
      shop,
      barcode        
     };
    dispatch(createProduct(productData));
  }

  useEffect(() => {
    if(isError_p){
      toast.error(message_p + ' Please try again.');
    }
    // undefined fixes a bug of the toast message showing when no product has been registered to the database
    if(isSuccess_p && official_name !== undefined){
      toast.success(capitaliseMe(official_name) + ' has been added');
      clearFormData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isError_p, isSuccess_p, dispatch, message_p ]);

  return (
          <>
            {/* Registration Form Title */}
            <Col className='margin_bottom_title'>
             <h1 className='viewing_items_title'> Create Product
               <span> <FontAwesomeIcon icon={faShrimp} className="icon_orange"/> </span>
             </h1>
               <span className='main_text'>Fill out the fields below to add a product to the database</span>
            </Col>

            {/* Add Item Receipt List Title */}
            <section className='formBody'>
              <form onSubmit={onSubmit}> 

                {/* official_name */}
                <Col className='space_between_inputs'>
                  <span className='moving_input_titles'> Official Product Name </span>
                  <input type="text"
                    id='official_name_p'
                    name='official_name'
                    value={official_name || ''}
                    placeholder='Pringles Original Crisps 165G'
                    className="form-control" 
                    onChange={onChange}/>          
                </Col>          
                
                {/* generic_name */}
                <Col className='space_between_inputs'>
                  <span className='moving_input_titles'> Generic Product Name </span>
                  <input 
                    type="text" 
                    id='generic_name_p' 
                    name='generic_name' 
                    value={generic_name || ''} 
                    placeholder='Crisps'
                    className="form-control"  
                    onChange={onChange}/>          
                </Col>

                {/* barcode */}
                <Col className='space_between_inputs'>
                  <span className='moving_input_titles'> Barcode </span>
                  <input 
                    type="number" 
                    id='barcode_p'
                    className="form-control" 
                    name='barcode' 
                    value={barcode || ''} 
                    placeholder='123456789101' 
                    onChange={onChange}/>          
                </Col>

                {/* shop */}
                <Col className='space_between_inputs'>
                  <Form.Group className="mb-3">
                    <Form.Label id='create_product_shop_details'><span className='moving_input_titles'> Shop </span></Form.Label>
                    <Form.Select id='shop_create_product' name='shop' value={shop || ''} onChange={onChange} className="form-control">
                      {shops.map((shop, index) => {
                        return(
                        <option key={index}>
                          {shop.name}
                        </option>                    
                        )})}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* category enum*/}
                <Col className='space_between_inputs'>
                  <Form.Group className="mb-3">
                    <Form.Label id='create_product_cat_details'><span className='moving_input_titles'> Choose Category </span></Form.Label>
                    <Form.Select id='cat_create_product' name='category' value={category || ''} onChange={onChange} className="form-control">
                      {categories.map((category, index) => {
                        return(  
                        <option key={index}>
                          {category.type}
                        </option>                    
                        )})}
                    </Form.Select>
                  </Form.Group>
                </Col>  

                {/* price_per_unit */}
                <Col className='space_between_inputs'>
                  <span className='moving_input_titles'> Price Per Unit </span>
                  <input 
                  type="number" 
                  step={0.01} 
                  id='price_per_unit_p' 
                  name='price_per_unit' 
                  value={price_per_unit || ''} 
                  placeholder='€2.50'
                  className="form-control"  
                  onChange={onChange}/>          
                </Col >

                {/* sale */}
                <Col className='space_between_inputs'>
                  <Form.Group className="mb-3">
                    <Form.Label id='create_product_sale_details' ><span className='moving_input_titles'> Sale </span></Form.Label>
                    <Form.Select id='sale_create_product' name='sale' value={sale || ''} onChange={onChange} className="form-control">
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
                <Col className='space_between_inputs' id='create_button_position'>
                  <button type='submit' className='white_bg_submit' id='create_product_button'> Create Product </button>
                </Col>
              </form>
            </section>     
          </>
        );  
  }

export default NewProduct