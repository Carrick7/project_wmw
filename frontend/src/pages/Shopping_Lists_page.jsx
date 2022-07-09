import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewShoppingList from '../components/ShoppingLists/NewShoppingList/NewShoppingList';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from '../components/Spinner/Spinner';
import { getAllShoppingLists, reset } from '../features/shopping_lists/shopping_listSlice';
import UpdateShoppingList from '../components/ShoppingLists/UpdateShoppingList/UpdateShoppingList';
import { toast } from 'react-toastify';
function Shopping_Lists_page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the shopping list states from the redux store
  const {shopping_lists, isLoading, isError, message} = useSelector((state) => state.shopping_lists);

  //fething user data (profile)
  const { user } = useSelector((state) => state.auth);

  
  useEffect(() => {
    // using toast to display error message from backend
    if(isError){
      toast.error(message + ' Please try again.');
    }
    // sending the user to login page if user is not logged in
    if (!user) {
      navigate('/login');
    }

    // executing the getAllShoppingLists action
    dispatch(getAllShoppingLists());
    // when user leaves, the state is reset (wipe out user storage)
      return() => {
        dispatch(reset());
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
      Testing getting the values from redux store -
      <br />
      <br />
      <UpdateShoppingList/>
    </Container>
  )
}

export default Shopping_Lists_page