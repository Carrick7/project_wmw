import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Slice/Redux import
import { getAllShoppingLists, reset } from '../features/shopping_lists/shopping_listSlice';
import { useSelector, useDispatch } from 'react-redux';
// Components imports
import AllShoppingLists from '../components/ShoppingLists/AllShoppingLists/AllShoppingLists';
import NewShoppingList from '../components/ShoppingLists/NewShoppingList/NewShoppingList';
import Spinner from '../components/Spinner/Spinner';
//CSS import
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Shopping_Lists_page() {
  //Initialising dispatch & navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //fething user data (profile)
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    // using toast to display error message from backend
    if(isError){
      toast.error(message + ' Please try again.');
    }
    // sending the user to login page if user is not logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, isError, message, dispatch]);

  // Loading spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1> Welcome {user.user_name}</h1>
          <h1>Create a new Shopping List</h1>
        </Col>
      </Row>
      <NewShoppingList />
      <br />
      <hr />
       All List Names <AllShoppingLists />
       <hr />
    </Container>
  )
}

export default Shopping_Lists_page