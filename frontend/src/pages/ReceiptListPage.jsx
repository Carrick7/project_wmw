import { useEffect } from 'react';
//Router Dom
import { useNavigate } from 'react-router-dom';
//Componenets
import AllReceiptLists from '../components/ReceiptLists/AllReceiptLists/AllReceiptLists';
import NewReceiptList from '../components/ReceiptLists/NewReceiptList/NewReceiptList';
import Spinner from '../components/Spinner/Spinner';
import AllReceiptsCost from '../components/UserStats/AllReceiptsCost/AllReceiptsCost';
// Slice/Redux import
import { useSelector, useDispatch } from 'react-redux';
import { reset_sl } from '../features/shopping_lists/shopping_listSlice';
import { reset_rl } from '../features/receipt_lists/receipt_listSlice';
import { reset_p } from '../features/products/productSlice';
//Toast Errors
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col } from 'react-bootstrap';

const ReceiptListPage = () => {
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
  }, [user, navigate, isError, message, dispatch ]);

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
            <h1 className='main_title' id='your_receipts_title'> Your Receipts </h1>
            <Col className='main_text'>
              <span>
                In the Receipt section of the application, you can create a new receipts, view all your existing receipts, 
                and add or remove items from receipts. You will also be able to view your statistics about your receipts.
              </span>
            </Col>
            <Col className='main_text'>
            <span>
              Create a new receipt by naming it below.
            </span>
          </Col>
          <Col className='main_create_col'>
            <h2 id='margin_bottom_title'> Create New Receipt </h2>
            <NewReceiptList />
          </Col>         
          </Col>

          {/*All Receipt Lists*/}
          <Col >
            <Col >
              <h1 className="main_title">
                <Row>
                  <Col xl={8}><span className='user_name_capitalise'>{user.user_name}'s Receipts</span></Col> 
                  <AllReceiptsCost/>
                </Row>
              </h1>
            </Col >
            <AllReceiptLists />
          </Col>           
        </Row>
      </Container>
      ):(
        null
      )}
  </>
  )
}

export default ReceiptListPage