import { useState, useEffect } from 'react';
//Slice/Redux import
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../../features/counter/counterSlice';
//React Router Dom import
import { useLocation, Link } from "react-router-dom"
import { toast } from 'react-toastify';
//Axios
import axios from 'axios';
//CSS
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
//helpers
import { capitaliseMe } from '../../../helpers/helperFunctions';

const RemoveItemReceiptList = ({item, receipt_list_id, receipt_list_name}) => {

  //initialise dispatch
  const dispatch = useDispatch();

  //fething user data (profile) & setting up header
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }  
  //Isolating item ID from URL
  const product_path = useLocation().pathname.split("/")[4];

  // useState for shopping list data
  const [targetId, setTargetId ] = useState(null);
  const [ deletedItem , setDeletedItem ] = useState(null);

  // formatting user input to JSON
  const formatData = (res) => { return JSON.stringify(res, null, 2); }

  // UseEffect to update the state of the taget ID with the product_path
  useEffect(() => {
    setTargetId(product_path);
  },[product_path]);

  //Delete Product 
  const deleteProduct = async () => {
    const deleted_item = {
      item_info : [{_id: targetId }]
    }
    try{
      const res = await axios.put(`/api/receipt_lists/${receipt_list_id}/remove_item`, deleted_item, config);
      const result = { data: res.data }
      setDeletedItem(formatData(result));
      toast.success(`${capitaliseMe(item.official_name)} removed from ${capitaliseMe(receipt_list_name)}`);
    }
    catch(error){
      toast.error(error.response.data.message + ' Please try again.');
    }
  } 

  // onClick to delete the product and update the state of counter
  const onDelete = (e) => {
  e.preventDefault();
  dispatch(increment());
  deleteProduct();
  }

  //Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //The Button can be a div so user can click anywhere on the div and then the delete button can be clicked
  return (
    <>
      <Link to={{pathname:`/receipt_lists/${receipt_list_id}/product/${item._id}`}}>
        <button onClick={handleShow} className='delete_items_single_lists'> <FontAwesomeIcon icon={faX} className="icon_x"/> </button>
      </Link> 

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><span className='capatilise_modal'> Delete {item.official_name} </span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='capatilise_modal'>
            This will permanently delete {item.official_name} from {receipt_list_name} 
          </span>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onDelete} className='delete_items_single_lists' id='delete_for_good_receipt'>
            <span className='capatilise_modal'> 
              Delete {item.official_name}
            </span>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RemoveItemReceiptList