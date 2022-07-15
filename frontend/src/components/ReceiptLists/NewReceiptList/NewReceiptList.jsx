import { useState } from "react";
import {  useDispatch } from 'react-redux';
//Slice/Redux import
import { createReceiptList } from '../../../features/receipt_lists/receipt_listSlice';
//CSS
import { Container, Row, Col } from 'react-bootstrap';

const NewReceiptList = () => {
  //useState 
  const [list_name, set_list_name] = useState("");

  //initialising dispatch
  const dispatch = useDispatch();

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

  return (
    <>
      {/* Title */}
      <section>
        <Col>
          <h2>Name Your Receipt List </h2>
        </Col>
      </section>
      {/* Registration Form Body */}
      <section className='rl_formBody'>
        <form onSubmit={onSubmit}>
          {/* list_name */}
          <Col className='rl_form_input'>      
            <input type="text" className="sl_form-control" id='list_name' name='list_name' value={list_name} placeholder='Receipt List Name' onChange={onChange}/>
          </Col>
          {/* Submit Button */}     
          <Col className='rl_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>       
        </form>
      </section> 
    </>
  )
}

export default NewReceiptList