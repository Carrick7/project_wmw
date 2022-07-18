import { useState, useEffect } from "react";
//Slice/Redux import
import { createReceiptList } from '../../../features/receipt_lists/receipt_listSlice';
import { useDispatch, useSelector } from "react-redux";
//Components
import Spinner from '../../Spinner/Spinner';
//CSS
import { Container, Row, Col } from 'react-bootstrap';
//Toast Errors
import { toast } from 'react-toastify';

const NewReceiptList = () => {
  //useState 
  const [list_name, set_list_name] = useState("");

  //initialising dispatch
  const dispatch = useDispatch();

  // Get the receipt lists state from the redux store
  const { isError_rl, message_rl, isSuccess_rl, isLoading_rl } = useSelector((state) => state.receipt_lists);

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

  //Send error and load spinner
  useEffect(() => {
    //if there is an error, display it
    if(isError_rl) {
      toast.error(message_rl + ' Please try again.');
    }
    //Spinner
    if(isLoading_rl) {
      return <Spinner />;
    }
  }, [isError_rl, message_rl, dispatch]);

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
