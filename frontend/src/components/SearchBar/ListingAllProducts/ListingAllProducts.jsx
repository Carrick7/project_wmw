import Product from "./Product"

const ListingAllProducts = ({searchResults}) => {
  //mapping through each product and passing them on the the next component
  const results = searchResults.map(OneProductData => <Product key={OneProductData._id} OneProductData={OneProductData}/>)

  //if there are no results, display a message
  const content = results?.length ? results : <h1>No results found</h1>

  return (
    <div>{content}</div>
  )
}

export default ListingAllProducts