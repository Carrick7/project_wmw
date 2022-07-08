import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewShoppingList from '../components/ShoppingLists/NewShoppingList';
import { Container, Row, Col } from 'react-bootstrap';

function Shopping_Lists_page() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // sending the user to login page if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Row>
        <Col>
          <h1> Welcome {user.user_name}</h1>
          <h1>Create a new Shopping List</h1>
        </Col>
      </Row>
      <NewShoppingList />
    </Container>
  )
}

export default Shopping_Lists_page