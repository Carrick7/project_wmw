import { useEffect } from 'react';
//Router Dom
import { useNavigate } from 'react-router-dom';
//Componenets
import AllReceiptLists from '../components/ReceiptLists/AllReceiptLists/AllReceiptLists';
import NewReceiptList from '../components/ReceiptLists/NewReceiptList/NewReceiptList';
import Spinner from '../components/Spinner/Spinner';
// Slice/Redux import
import { useSelector, useDispatch } from 'react-redux';
import { getAllReceiptLists, reset_rl } from '../features/receipt_lists/receipt_listSlice';
//Toast Errors
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col } from 'react-bootstrap';

const Receipt_List_page = () => {
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

    // executing the getAllReceiptLists action
    dispatch(getAllReceiptLists());
    // when user leaves, the state is reset_rl (wipe out user storage)
      return() => {
        dispatch(reset_rl());
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
          <h1>Receipt_List_page</h1>
        </Col>
      </Row>
      <Row>
        {/*Create New List*/}
        <Col>
          <NewReceiptList />
        </Col>
        <hr />
        {/*All Receipt Lists*/}
        <Col>
          <AllReceiptLists />
        </Col>
      </Row>
    </Container>
  )
}

export default Receipt_List_page