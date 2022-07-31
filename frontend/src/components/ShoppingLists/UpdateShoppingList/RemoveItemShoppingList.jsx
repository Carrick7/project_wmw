import { useState, useEffect } from 'react';
//redux/slices
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../../features/counter/counterSlice';
//React Router Dom import
import { useLocation, Link } from "react-router-dom"
import { toast } from 'react-toastify';
//Axios
import axios from 'axios';
//CSS
import './UpdateShoppingList.css';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';

function RemoveItemShoppingList( {product, shopping_list_id, shopping_list_name} ) {

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
  //Isolating product ID from URL
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
      product_info : [{_id: targetId }]
  }
  try{
    const res = await axios.put(`/api/shopping_lists/${shopping_list_id}/remove_item`, deleted_item, config);
    const result = { data: res.data }
    setDeletedItem(formatData(result));
    toast.success(`${product.product_name} removed from ${shopping_list_name}`);
  }
  catch(error){
    toast.error(error.response.data.message + ' Please try again.');
  }
 }

 const deleteMe = (e) => {
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
      <Link to={{pathname:`/shopping_lists/${shopping_list_id}/product/${product._id}`}}>
        <button onClick={handleShow} className='delete_items_single_lists'> <FontAwesomeIcon icon={faX} className="icon_x"/> </button>
      </Link> 

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><span className='capatilise_modal'> Delete {product.product_name} </span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='capatilise_modal'>
            This will permanently delete  {product.product_name} from {shopping_list_name} 
          </span>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={deleteMe} className='delete_items_single_lists' id='delete_for_good'>
            <span className='capatilise_modal'> 
              Delete {product.product_name}
            </span>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default RemoveItemShoppingList
