import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
//CSS
import './Login.css';

function Login() {
  // useState for the form data
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // onChange function for the form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const onSubmit = (e) => {
    e.preventDefault();
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