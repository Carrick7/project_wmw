import { useState, useEffect } from 'react';
//Slice/Redux import
import { createShoppingList } from '../../../features/shopping_lists/shopping_listSlice';
import { useDispatch, useSelector } from "react-redux";
//CSS
import { Col } from 'react-bootstrap';
//Toast Errors
import { toast } from 'react-toastify';

function NewShoppingList() {
  //useState for the form data
  const [ title, setTitle ] = useState('');

  // Get the shopping lists state from the redux store
  const { isError, message } = useSelector((state) => state.shopping_lists);

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

  //Send error and load spinner
  useEffect(() => {
    //if there is an error, display it
    if(isError) {
      toast.error(message + ' Please try again.');
    }
  }, [isError, message, dispatch]);

  return (
    <>
      {/* Registration Form Body */}
      <section >
        <form onSubmit={onSubmit}className='sl_formBody'>
          <Col className='restricting_size'>
            {/* title */}
            <Col className='sl_form_input'>    
              <span className='moving_input_titles'> Name </span>
              <br />
              <input type="text" className="form-control" id='sl_title_input' name='title' value={title} placeholder='Shopping List Name' onChange={onChange}/>
            </Col>
            {/* Submit Button */}     
            <Col className='white_bg_submit_position'>
              <button type='submit' className='white_bg_submit'> Create </button>
            </Col>    
          </Col>   
        </form>
      </section>
    </> 
  )
}

export default NewShoppingList