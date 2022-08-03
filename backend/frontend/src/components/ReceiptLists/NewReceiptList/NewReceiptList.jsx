import { useState, useEffect } from "react";
//Slice/Redux import
import { createReceiptList } from '../../../features/receipt_lists/receipt_listSlice';
import { useDispatch, useSelector } from "react-redux";
//CSS
import { Col } from 'react-bootstrap';
//Toast Errors
import { toast } from 'react-toastify';
import './NewReceiptList.css';

const NewReceiptList = () => {
  //useState 
  const [list_name, set_list_name] = useState("");

  //initialising dispatch
  const dispatch = useDispatch();

  // Get the receipt lists state from the redux store
  const { isError_rl, message_rl } = useSelector((state) => state.receipt_lists);

  // Submit input for form
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createReceiptList({list_name}));
    set_list_name('');
  }
  
  // Allow user to enter text into input
  const onChange = (e) => {
    set_list_name(e.target.value);
  }

  useEffect(() => {
    //if there is an error, display it
    if(isError_rl) {
      toast.error(message_rl + ' Please try again.');
    }
  }, [isError_rl, message_rl, dispatch]);

  return (
    <>
      {/* Registration Form Body */}
      <section>
        <form onSubmit={onSubmit} className='receipt_formBody'>
          <Col className='restricting_size'>
            {/* receipt name*/}
          </Col>
          {/* list_name */}
          <Col className='receipt_form_input' id='restrict_size_input'>    
            <span className='moving_input_titles'> Name </span>
            <br />
            <input type="text" className="form-control" id='list_name_input' name='list_name' value={list_name} placeholder='Receipt List Name' onChange={onChange}/>
          </Col>
          {/* Submit Button */}     
          <Col className='white_bg_submit_position' id='centre_me_receipt_submit'>
            <button type='submit' className='white_bg_submit'> Create </button>
          </Col>       
        </form>
      </section> 
    </>
  )
}

export default NewReceiptList
