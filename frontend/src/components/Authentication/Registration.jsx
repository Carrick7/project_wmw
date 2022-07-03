import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Registration() {
  // useState for the form data
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  // onChange function for the form data
  const onChange = (e) => {
    
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
        <form>
          <input type="text" className="form-control" id='name' name='name' value={name} placeholder='What would you like to be called?' onChange={onChange}/>
        </form>
      </section>
    </Container> 
  )
}

export default Registration