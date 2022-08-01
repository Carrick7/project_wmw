//Componenets
import Product from "./Product"
import NotFound from "../../Spinner/NotFound/NotFound"

const ListingAllProducts = ({searchResults}) => {
  //mapping through each product and passing them on the the next component
  const results = searchResults.map(OneProductData => 
    <Product key={OneProductData._id} OneProductData={OneProductData}/>)
  
    //if there are no results, display a message
  const content = results?.length ? results : <NotFound />

  return (
    <div>{content}</div>
  )
}

export default ListingAllProducts