import { useState, useEffect } from 'react';
//Slice/Redux import
import { createProduct, reset_p } from '../../../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux";
//Components
import Spinner from '../../Spinner/Spinner';
//helpers
import { shops, categories, onSale } from '../../../helpers/helpers';
//CSS
import { Container, Row, Col, Form } from 'react-bootstrap';
//Toast Errors
import { toast } from 'react-toastify';

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
  const { isLoading_p, isError_p, isSuccess_p, message_p } = useSelector((state) => state.products);

  useEffect(() => {
    if(isLoading_p){
      return <Spinner />
    }

    if(isError_p){
      toast.error(message_p + ' Please try again.');
    }
    if(isSuccess_p){
      toast.success(official_name + ' has been added');
      clearFormData();
    }
  }, [isSuccess_p, isError_p, dispatch]);

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
    dispatch(reset_p());
    console.log(productData);
  }

  return (
    <>
      {/* Registration Form Title */}
      <section>
        <Col>
          <h1 className='formTitle'>Add Product</h1>
          <h3>Fill out the fields below to add a product to the database</h3>
        </Col>
      </section>
      {/* Add Item Receipt List Title */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>         
          {/* barcode */}
          <Col className='p_form_input'>
           <input type="number" id='barcode_p' name='barcode' value={barcode || ''} placeholder='123456789101' onChange={onChange}/>          
          </Col>
          {/* official_name */}
          <Col className='p_form_input'>
           <input type="text" id='official_name_p' name='official_name' value={official_name || ''} placeholder='Ivorian Bananas' onChange={onChange}/>          
          </Col>
          {/* generic_name */}
          <Col className='p_form_input'>
           <input type="text" id='generic_name_p' name='generic_name' value={generic_name || ''} placeholder='Bananas' onChange={onChange}/>          
          </Col>
          {/* category enum*/}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >Choose Category</Form.Label>
              <Form.Select id='category_p' name='category' value={category || ''} onChange={onChange}>
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
              <Form.Select id='shop_p' name='shop' value={shop || ''} onChange={onChange}>
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
          <Col className='p_form_input'>
            <input type="number" step={0.01} id='price_per_unit_p' name='price_per_unit' value={price_per_unit || ''} placeholder='price_per_unit' onChange={onChange}/>          
          </Col >
          {/* sale */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label >On Sale?</Form.Label>
              <Form.Select id='sale_p' name='sale' value={sale || ''} onChange={onChange}>
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
          <Col className='p_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>
        </form>
      </section>     
    </>
  )
}

export default NewProduct