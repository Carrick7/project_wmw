import { useEffect } from "react";
//Router Dom
import { Link } from "react-router-dom";
//Slice/Reducx
import { deleteReceiptList, getAllReceiptLists } from "../../../features/receipt_lists/receipt_listSlice";
import { useDispatch, useSelector } from "react-redux";
import { reset_c } from '../../../features/counter/counterSlice';
//CSS
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './AllReceiptLists.css';

const AllReceiptLists = () => {
  //Initialising dispatch & navigate
  const dispatch = useDispatch();

  // Get the receipt lists state from the redux store
  const {receipt_lists } = useSelector((state) => state.receipt_lists);

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);
  
  useEffect(() => {
    dispatch(getAllReceiptLists());
    dispatch(reset_c());
  }, [ count ]);
  
  return (
    <>
      <Row className="all_receipts">
       {receipt_lists.map((receipt_list) => {
         return (
           <Col key={receipt_list._id} xxl={4}>
            <Col className="main_col">
              <Row className="all_receipts_row">
                {/* bar for each receipt */}
                <Col xs={10} className='bar_for_each_list'>
                 <Link id="list_name" to={{pathname:`/receipt_lists/${receipt_list._id}`}}> 
                    <button className="navigate_to_list">{receipt_list.list_name}</button>
                  </Link>
                </Col>
                {/* delete button */}
                <Col xs={2} className='bar_for_each_list'>
                <button className='delete_button_bin' onClick={() => dispatch(deleteReceiptList(receipt_list._id))}>
                  <FontAwesomeIcon icon={faTrashCan}/>
                </button>
                </Col>
              </Row>
            </Col>
           </Col> 
          )
        })}        
      </Row> 
    </>
  )
}

export default AllReceiptLists