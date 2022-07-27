import { useEffect } from 'react';
//Router Dom
import { useNavigate } from 'react-router-dom';
//Componenets
import AllReceiptLists from '../components/ReceiptLists/AllReceiptLists/AllReceiptLists';
import NewReceiptList from '../components/ReceiptLists/NewReceiptList/NewReceiptList';
import Spinner from '../components/Spinner/Spinner';
import UserStats from '../components/UserStats/UserStats';
// Slice/Redux import
import { useSelector, useDispatch } from 'react-redux';
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
        <hr />
        {/*All Receipt Cost*/}
        <UserStats />
      </Row>
    </Container>
  )
}

export default ReceiptListPage