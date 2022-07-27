import { useState, useEffect } from 'react';
//Router Dom
import { useNavigate } from 'react-router-dom';
//Toastify
import { toast } from 'react-toastify';
//Redux/Slice
import { login, reset } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
//Components
import Spinner from '../Spinner/Spinner';
//CSS
import './Login.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlockKeyhole, faKey } from '@fortawesome/free-solid-svg-icons';

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
    <>
    <Container fluid id='login_container'>
      <Row>
        <Col md={4} className="form_login">
      {/* login Form Title */}
      <section>
        <Col>
          <h1 className='formTitle_footer'>Login</h1>
        </Col>
      </section>
      {/* login Form Body */}
      <section className='formBody'>
        <form onSubmit={onSubmit}>
          {/* email */}
          <Col className='login_form_input'>
           <input type="email" className="form-control" id='email_login' name='email' value={email} placeholder='email@example.com' onChange={onChange}/>          
          </Col>
          {/* password */}
          <Col className='login_form_input'>
           <input type="password" className="form-control" id='password_login' name='password' value={password} placeholder='Password' onChange={onChange}/>           
          </Col>          
          {/* submit button */}
          <Col className='login_form_input'>
            <button type='submit' id='login_button'> Login </button>
          </Col>
        </form>
      </section>
      </Col>
      <Col md={8} className='lockNKey'>
        <span className='fa-layers fa-fw fa-lg'>
          <FontAwesomeIcon className="unlock_icon" icon={faUnlockKeyhole} shake/>
          <FontAwesomeIcon className="key_icon" icon={faKey} transform={"shrink-6"} shake/>
        </span>
      </Col>
      </Row>
    </Container> 
    </>
  )
}

export default Login