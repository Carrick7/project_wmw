import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Slice/Redux import
import { useSelector, useDispatch } from 'react-redux';
import { reset_sl } from '../features/shopping_lists/shopping_listSlice';
import { reset_rl } from '../features/receipt_lists/receipt_listSlice';
import { reset_p } from '../features/products/productSlice';
// Components imports
import AllShoppingLists from '../components/ShoppingLists/AllShoppingLists/AllShoppingLists';
import NewShoppingList from '../components/ShoppingLists/NewShoppingList/NewShoppingList';
import Spinner from '../components/Spinner/Spinner';
//CSS import
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ShoppingListsPage() {
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

  //resetting states when changing pages to avoid crashing when a user inputs an error
  useEffect (() => {
    dispatch(reset_sl());
    dispatch(reset_rl());
    dispatch(reset_p());
  }, [dispatch]);

  // Loading spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    {user ? (
      <Container fluid className="main_container">
            <Row> 
            <Col>
              <h1 className='main_title'>Your Shopping Lists</h1>
              <Col className='main_text'>
                <span> 
                  Welcome <span className='user_name_capitalise'>{user.user_name}</span> to your shopping list hub. On this page you can create, 
                  view and delete your shopping lists. 
                </span>
              </Col>
                <Col className='main_text'>
                <span>
                  Create a new shopping list by naming it below. You can also view and navigate  
                  to the rest of your shopping lists.
                </span>
              </Col>
              <Col className='main_create_col'>
                <h2 className='margin_bottom_title'> Create Shopping List </h2>
                <NewShoppingList />
              </Col>
            </Col>

              {/* All Shopping Lists */}
              <Col >
                <Col >
                  <h1 className="main_title">
                    <span className='user_name_capitalise'>{user.user_name}</span>'s Shopping Lists
                  </h1>
                </Col >
                <AllShoppingLists />
              </Col>       
            </Row>
          </Container>  
    ):(
      null
     )}
  </>
  )
}

export default ShoppingListsPage