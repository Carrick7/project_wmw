import { useSelector } from "react-redux";

  function UpdateShoppingList() {  

  // Get the shopping list states from the redux store
  const {shopping_lists, isLoading, isError, message} = useSelector((state) => state.shopping_lists);

    return (
      <div>
        {shopping_lists.map((shopping_list) => {
          return (
            <div>{shopping_list.title}</div>
        )
      })}
      </div>
    )
  }
  
  export default UpdateShoppingList