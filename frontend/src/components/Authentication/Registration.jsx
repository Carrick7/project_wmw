import { useState, useEffect } from 'react';
//Router Dom
import { useNavigate } from 'react-router-dom';
//Components
import Spinner from '../Spinner/Spinner';
//Redux/Slice
import { register, reset } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
//CSS
import './Registration.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
//Toastify
import { toast } from 'react-toastify';

function Registration() {
  // useState for the form data
  const [ formData, setFormData ] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  //set the form data
  const { user_name, email, password, confirmPassword } = formData;

  //Initialise navigate & dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // getting the relevant info from the redux store
  const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError){
      toast.error(message + ' Please try again.');
    }
    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset());

    if(isLoading){
      return <Spinner />
    }

  }, [isSuccess, isError, message, navigate, dispatch]);

  // onChange function for the form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  
  //Submit
  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    else{
      const userData = { user_name, email, password };

      dispatch(register(userData));
    }
  }

  return (
    <>
      <Row>
        <Col md={6} className='formBody'>
          {/* Registration Form Title */}
          <section>
            <Col className='sign_up_title_col'>
              <h1 className='formTitle'>Sign Up</h1>
              <span>Fill out the fields below to create an account</span>
            </Col>
          </section>
        {/* Registration Form Body */}
          <form onSubmit={onSubmit}>
            {/* user_name */}
            <Col className='registration_form_input'>
              <span>Username</span>      
              <input type="text" className="form-control" id='user_name' name='user_name' value={user_name} placeholder='Lawrenz 09' onChange={onChange}/>
            </Col>          
            {/* email */}
            <span>Email Address</span>
            <Col className='registration_form_input'>
            <input type="email" className="form-control" id='email' name='email' value={email} placeholder='email@example.com' onChange={onChange}/>          
            </Col>
            {/* password */}
            <span>Password</span>
            <Col className='registration_form_input'>
            <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Password' onChange={onChange}/>           
            </Col>          
            {/* confirmPassword */}
            <span>Confirm Password</span>
            <Col className='registration_form_input'>
              <input type="password" className="form-control" id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={onChange}/>          
            </Col >
            {/* submit button */}
            <Col className='registration_form_input'>
              <button type='submit' id='register_button'> Register </button>
            </Col>
          </form>
        </Col>    
      {/* Image or graphic */}
       <Col md={6}>
        <Col className='id_and_text'>
          <FontAwesomeIcon className="id_card" icon={faIdCard} flip/>
           <Col className='text_sign_up_card'><span> Create an account to access the full features of Watch My Wallet </span></Col>
        </Col>
       </Col>
    </Row>
    </>
  )
}

export default Registration