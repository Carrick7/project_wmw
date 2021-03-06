import { useState, useRef } from 'react';
//Redux/Slice
import { useSelector } from 'react-redux';
//Toastify
import { toast } from 'react-toastify';
//CSS
import './UpdateShoppingList.css';
import { Container, Row, Col } from 'react-bootstrap';
//Axios
import axios from 'axios';


function AddItemShoppingList( {shoppingListData} ) {

  //fething user data (profile) & setting up header
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  // setting up for useRef
  const updated_product_name = useRef(null);
  const updated_quantity = useRef(null);
  //set up for useState
  const [ updateResult , setUpdatedResult ] = useState(null);
  
  // formatting user input to JSON
  const formatData = (res) => { return JSON.stringify(res, null, 2); }

  // Add Product 
  const addProductItem = async () => {
    const add_product = {
      product_info : [{
        product_name: updated_product_name.current.value,
        quantity: updated_quantity.current.value,
      }]
  }
    try{
      const res = await axios.put(`/api/shopping_lists/${shoppingListData._id}`, add_product, config);
      const result = { data: res.data };
      setUpdatedResult(formatData(result));
      toast.success(`${updated_product_name.current.value} added to ${shoppingListData.title}`);
    }
    catch(error){
      toast.error(error.response.data.message + ' Please try again.');
    }
  }

  //Submit Button
  const onSubmit = (e) => {
    e.preventDefault();
    addProductItem();
  }

  return (
    <Container className='formHeader'>
      {/* Registration Form Title */}
      <section>
        <Col>
          <h1 className='formTitle'>Add Items</h1>
        </Col>  
      </section>
      {/* Registration Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* product_name */}
          <Col className='registration_form_input'>      
            <input type='text' className="form-control" id='product_name' ref={updated_product_name} placeholder='eggs'/>
          </Col>          
          {/* quantity */}
          <Col className='registration_form_input'>
           <input type='number' className="form-control" id='quantity' ref={updated_quantity} placeholder='23'/>          
          </Col>
          {/* submit button */}
          <Col className='registration_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>
        </form>
      </section>
    </Container> 
  )
}


export default AddItemShoppingList