//CSS
import { Container, Row, Col } from "react-bootstrap";

const SearchBar = ({productData, setSearchResults}) => {

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
  }

  //onChange
  const onChange = (e) => {
    if(!e.target.value) return setSearchResults(productData);
    
    //matching up user input with productData. Every input is converted to lowercase to match db
    const resultsArray = productData.filter(pData => 
      pData.shop.includes(e.target.value.toLowerCase()) || 
      pData.category.includes(e.target.value.toLowerCase()) ||
      pData.product_names[0].generic_name.includes(e.target.value.toLowerCase()) ||
      pData.product_names[0].official_name.includes(e.target.value.toLowerCase())
    );
      setSearchResults(resultsArray);
     
  }  
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
        >          
        </input>
        <button> Searching....</button>
      </form>
    </>
  )
}

export default SearchBar