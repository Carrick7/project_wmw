import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner/Spinner';
//CSS
import './Login.css';

function Login() {
  // useState for the form data
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const userData = { email, password };
    dispatch(login(userData));
  }

  // Loading Spinner if isLoading is true
  if(isLoading){
    return <Spinner />
  }

  return (
    <Container className='formHeader'>
      {/* login Form Title */}
      <section>
        <Col>
          <h1 className='formTitle'>Login</h1>
        </Col>
      </section>
      {/* login Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* email */}
          <Col className='login_form_input'>
           <input type="email" className="form-control" id='email' name='email' value={email} placeholder='email@example.com' onChange={onChange}/>          
          </Col>
          {/* password */}
          <Col className='login_form_input'>
           <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Password' onChange={onChange}/>           
          </Col>          
          {/* submit button */}
          <Col className='login_form_input'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </Col>
        </form>
      </section>
    </Container> 
  )
}

export default Login