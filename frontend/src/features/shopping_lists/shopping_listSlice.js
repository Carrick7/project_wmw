import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import shopping_listService from './shopping_listService';

const initialState = {
    shopping_lists: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// Create Shopping List
export const createShoppingList = createAsyncThunk(
    'shopping_list/create', async (shopping_listData, thunkAPI) => {
    try{
      // getting the token from the auth state
      const token = thunkAPI.getState().auth.user.token;
      return await shopping_listService.createShoppingList(shopping_listData, token);
    }
    catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue({message});
      }
    }
);



  //Slice
export const shopping_listSlice = createSlice({
    name: 'shopping_list',
    initialState,
    reducers: {
      reset: (state) => initialState
    },
    extraReducers: (builder) => {
    builder
      // Create Shopping List
      .addCase(createShoppingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shopping_lists.push(action.payload);
      })
      .addCase(createShoppingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
    }
}); 

  // Export Reducer
  export const { reset } = shopping_listSlice.actions;
  export default shopping_listSlice.reducer;