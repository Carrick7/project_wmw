import { useEffect, useState } from "react";
//components
import GetSingleProduct from "../components/AllProducts/GetSingleProduct/GetSingleProduct"
import SearchBar from "../components/SearchBar/SearchBar";
import Spinner from "../components/Spinner/Spinner";
//Slice/Reducx
import { getAllProducts, reset_p } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
//CSS
import { Container, Row, Col } from "react-bootstrap";
//Toast Errors
import { toast } from 'react-toastify';
import ListingAllProducts from "../components/SearchBar/ListingAllProducts/ListingAllProducts";


const ProductsPage = () => {
  //Initialising dispatch & navigate
  const dispatch = useDispatch();
  
  //useState for search results 
  const [searchResults, setSearchResults] = useState([])
  const [productData, setProductData] = useState([]);

  // Get the receipt lists state from the redux store
  const { isLoading_p, isError_p, message_p} = useSelector((state) => state.products);

  //useEffect for getting all products
  useEffect(() => {
    if(isError_p) {
      toast.error(message_p + ' Please try again.');
    }
    if(isLoading_p) {
      return <Spinner />;
    }
    // executing the getAllShoppingLists action
    dispatch(getAllProducts()).then(
      json => {
        setProductData(json.payload)
        setSearchResults(json.payload)
      }
    );
  }, [dispatch]);

  return (
    <>  
      <Container>
        <SearchBar productData={productData} setSearchResults={setSearchResults}/>
        <ListingAllProducts searchResults={searchResults}/>
      </Container>
    </>
  )
}

export default ProductsPage