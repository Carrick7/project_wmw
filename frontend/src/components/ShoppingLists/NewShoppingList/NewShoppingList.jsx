import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createShoppingList } from '../../../features/shopping_lists/shopping_listSlice';
import Spinner from '../../Spinner/Spinner';
//CSS
import './NewShoppingList.css';

function NewShoppingList() {
  //useState for the form data
  const [ title, setTitle ] = useState('');

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