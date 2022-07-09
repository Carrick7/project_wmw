import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner/Spinner';
//CSS
import './Registration.css';

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // getting the relevant info from the redux store
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

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
    <Container className='formHeader'>
      {/* Registration Form Title */}
      <section>
        <Col>
          <h1 className='formTitle'>Sign Up</h1>
          <span>Fill out the fields below to create an account</span>
        </Col>
      </section>
      {/* Registration Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* user_name */}
          <Col className='registration_form_input'>      
            <input type="text" className="form-control" id='user_name' name='user_name' value={user_name} placeholder='Lawrenz 09' onChange={onChange}/>
          </Col>          
          {/* email */}
          <Col className='registration_form_input'>
           <input type="email" className="form-control" id='email' name='email' value={email} placeholder='email@example.com' onChange={onChange}/>          
          </Col>
          {/* password */}
          <Col className='registration_form_input'>
           <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Password' onChange={onChange}/>           
          </Col>          
          {/* confirmPassword */}
          <Col className='registration_form_input'>
            <input type="password" className="form-control" id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={onChange}/>          
          </Col >
          {/* submit button */}
          <Col className='registration_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>
        </form>
      </section>
    </Container> 
  )
}

export default Registration