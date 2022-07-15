import { useState } from 'react';
import {  useDispatch } from 'react-redux';
//Slice/Redux import
import { createShoppingList } from '../../../features/shopping_lists/shopping_listSlice';
//CSS
import './NewShoppingList.css';
import { Container, Row, Col } from 'react-bootstrap';

function NewShoppingList() {
  //useState for the form data
  const [ title, setTitle ] = useState('');

  //initialising dispatch
  const dispatch = useDispatch();

  // Submit input for form
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createShoppingList({title}));
    setTitle('');
  }
  
  // Allow user to enter text into input
  const onChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <Container className='new_sl_form'>
      {/* Registration Form Title */}
      <section>
        <Col>
          <h2>Name Your New Shopping List </h2>
        </Col>
      </section>
      {/* Registration Form Body */}
      <section className='sl_formBody'>
        <form onSubmit={onSubmit}>
          {/* title */}
          <Col className='sl_form_input'>      
            <input type="text" className="sl_form-control" id='title' name='title' value={title} placeholder='Shopping List Name' onChange={onChange}/>
          </Col>
          {/* Submit Button */}     
          <Col className='sl_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>       
        </form>
      </section>
    </Container> 
  )
}

export default NewShoppingList