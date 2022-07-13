import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../Spinner/Spinner";
import { getSingleShoppingLists, reset } from '../../../features/shopping_lists/shopping_listSlice';


const Test = () => {  

  // Get the shopping list states from the redux store
  const {shopping_lists, isLoading, isError, message} = useSelector((state) => state.shopping_lists);

  // Determining the shopping list
  let id_url = window.location.pathname;
  let path = id_url.substring(16, id_url.length);
  const navigate = useNavigate();



  // initializing the dispatch function
  const dispatch = useDispatch();




  //fething user data (profile)
  const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    // using toast to display error message from backend
    if(isError){
      toast.error(message + ' Please try again.');
    }

    // when user leaves, the state is reset (wipe out user storage)
     dispatch(getSingleShoppingLists(path));
      return() => {
        dispatch(reset());
      }

  }, [user, isError, message, dispatch]);


    // Loading spinner
    if (isLoading) {
      return <Spinner />;
    }

  return (
    <div>      
      <h1> Welcome {user.user_name}
      <br />
      {shopping_lists._id}
      <br />
      {shopping_lists.title}</h1>

    </div>
  )
}

export default Test      

/*



*/