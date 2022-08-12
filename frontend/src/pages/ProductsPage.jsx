import { useEffect, useState } from "react";
//components
import SearchBar from "../components/SearchBar/SearchBar";
import ListingAllProducts from "../components/SearchBar/ListingAllProducts/ListingAllProducts"; 
//Slice/Reducx
import { getAllProducts } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
//CSS
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//Toast Errors
import { toast } from 'react-toastify';
//Router Dom
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  //Initialising dispatch & navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetching state from redux
  const { user } = useSelector((state) => state.auth);

  //useState for search results 
  const [searchResults, setSearchResults] = useState([])
  const [productData, setProductData] = useState([]);

  // Get the products state from the redux store
  const { isError_p, message_p} = useSelector((state) => state.products);

  //useEffect for getting all products
  useEffect(() => {
    if(isError_p) {
      toast.error(message_p + ' Please try again.');
    }
    // executing the getAllShoppingLists action
    dispatch(getAllProducts()).then(
      json => {
        setProductData(json.payload)
        setSearchResults(json.payload)
      }
    );
    // sending the user to login page if user is not logged in
     if (!user) {
      navigate('/login');
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
     {user ? (
      <Container fluid className="main_container">
        <Col>
          <h1 className='main_title' id='your_receipts_title'> Search For a Product </h1>
          <Col className='main_text'>
            <span>
              Welcome to the products page {user.user_name}. Here you can search for any item that is registered in the database 
              by their official/generic names, shop, category and barcode.
              <br /><br />
              If any of the search terms match, the products will be displayed in the list below.
              <br /><br />
              Each product listed will have its basic information alongside a line chart portraying its price points over time.
              This page can be used to compare product prices and to track the price of a product over time.
            </span>
          </Col>
        </Col>
    
        {/* Search Bar */}
        <Col>
          <Col>
            <h1 className='viewing_items_title'> 
              Search Bar
                <span> <FontAwesomeIcon icon={faMagnifyingGlass} className="icon_orange"/></span>
            </h1>
          </Col>
          <SearchBar productData={productData} setSearchResults={setSearchResults}/>
        </Col>
        
        {/* Listing All Products */}
        <Col>
          <ListingAllProducts searchResults={searchResults}/>
        </Col>

      </Container>      
    ):(
      null
    )}
  </>
  )
}

export default ProductsPage