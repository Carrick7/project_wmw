import { useEffect } from "react"
//Router Dom
import { useLocation, Link } from 'react-router-dom';
//Components
import Spinner from "../../Spinner/Spinner";
import AddItemReceiptList from "../UpdateReceiptList/AddItemReceiptList";
//Slices/Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteReceiptList, getSingleReceiptList, reset_rl } from "../../../features/receipt_lists/receipt_listSlice";
//Toast Errors
import { toast } from 'react-toastify';
//CSS
import { Container, Row, Col } from 'react-bootstrap';
import './SingleReceiptList.css';

const SingleReceiptList = () => {
  // Get the receipt lists state from the redux store
  const {receipt_lists, isLoading_rl, isError_rl, message_rl } = useSelector((state) => state.receipt_lists);

  //Initialising dispatch & navigate
  const dispatch = useDispatch();

  // Url Location
  const id_from_path = useLocation().pathname.split("/")[2];

  //Reloads the state of the receipt list when the user refreshes the page
  useEffect(() => {
    if (isError_rl) {
      toast.error(message_rl + ' Please try again.');
    }

    // executing the getAllReceiptLists action
    dispatch(getSingleReceiptList(id_from_path));

    // when user leaves, the state is reset_rl (wipe out user storage)
      return() => {
        dispatch(reset_rl());  
      };
   }, []);

 //Loading spinner
  if (isLoading_rl) {
    return <Spinner />;
  }

  return (
    <>
      {/*Title & Delete button*/}
      <h1>{receipt_lists.list_name}</h1>
      <Link to={{pathname:`/receipt_lists`}}><button onClick={() => dispatch(deleteReceiptList(receipt_lists._id))}> X </button></Link>
      {/*List Items
      <Row>
        {receipt_lists.item_info.map((item) => {
          <Col key={item._id}>
            Name: {item.official_name}
            Category: {item.category}
            Shop: {item.shop}
            Price: {item.price_per_unit}
            Quantity: {item.quantity}
            Barcode: {item.barcode}
          </Col>
        })}
      </Row>
      *********************************************
      CURRENTLY BREAKING SHIT
      *********************************************
      */}
      {/* Add Item */}
      <AddItemReceiptList />
    </>
  )
}

export default SingleReceiptList