import { useState, useRef } from 'react';
//Redux/Slice
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../../features/counter/counterSlice';
//Toastify
import { toast } from 'react-toastify';
//CSS
import './UpdateShoppingList.css';
import { Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons';
//Axios
import axios from 'axios';
//helpers
import { capitaliseMe } from '../../../helpers/helperFunctions';

function AddItemShoppingList( {shoppingListData } ) {
  
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

  // setting up for useRef
  const updated_product_name = useRef(null);
  const updated_quantity = useRef(null);
  //set up for useState
  // eslint-disable-next-line
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
  //setName(JSON.stringify(add_product.product_info.product_name, null, 2));
    try{
      const res = await axios.put(`/api/shopping_lists/${shoppingListData._id}`, add_product, config);
      const result = { data: res.data };
      setUpdatedResult(formatData(result));
      toast.success(`${(capitaliseMe(result.data.product_info.slice(-1)[0].product_name))} added to ${capitaliseMe(shoppingListData.title)}`);
    }
    catch(error){
      toast.error(error.response.data.message + ' Please try again.');
    }
  }

  //resetting input fields
  // eslint-disable-next-line
  const [ clearInput , setClearInput ] = useState(false);
  const resetInputs = () => {
    updated_product_name.current.value = '';
    updated_quantity.current.value = '';
    setClearInput(true);
  }

  //Submit Button
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(increment());    
    addProductItem();
    resetInputs();
  }

  return (
    <Container className='formHeader'>
      {/* Registration Form Title */}
      <section>
        <Col>
          <h1 className='viewing_items_title'>
            Add Items to 
            <span className="user_name_capitalise"> {shoppingListData.title} </span>
            <span><FontAwesomeIcon icon={faCarrot} className="icon_orange"/></span>
          </h1>
        </Col>  
      </section>
      {/* Registration Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* product_name */}
          <Col className='registration_form_input'>
            <span className='moving_input_titles'> Name </span>      
            <input type='text' className="form-control" id='product_name_sslist' ref={updated_product_name} placeholder='eggs'/>
          </Col>          
          {/* quantity */}
          <span className='moving_input_titles'> Quantity </span>   
          <Col className='registration_form_input'>
           <input type='text' className="form-control" id='quantity_sslist' ref={updated_quantity} placeholder='23'/>          
          </Col>
          {/* submit button*/}
          <Col className='registration_form_input'>
            <button type='submit' id='add_product_to_slist' className='white_bg_submit'> Add </button>
          </Col>
        </form>
      </section>
    </Container> 
  )
}


export default AddItemShoppingList
