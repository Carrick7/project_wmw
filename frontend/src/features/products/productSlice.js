import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
    products: [],
    isError_p: false,
    isLoading_p: false,
    isSuccess_p: false,
    message_p: '',
}

// Create Product
export const createProduct = createAsyncThunk(
    'product/create', async (productData, thunkAPI) => {
    try{
      // getting the token from the auth state
      const token = thunkAPI.getState().auth.user.token;
      return await productService.createProduct(productData, token);
    }
    catch(error) {
      const message_p = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message_p);
      }
    }
);

// get all receipt lists
export const getAllProducts = createAsyncThunk(
  'product/getAll', async (_, thunkAPI) => {
  try{
    // getting the token from the auth state
    const token = thunkAPI.getState().auth.user.token;
    return await productService.getAllProducts(token);
  }
  catch(error) {
    const message_p = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message_p);
    }
  }
);

//Slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      reset_p: (state) => initialState
    },
    extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading_p = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading_p = false;
        state.isSuccess_p = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading_p = false;
        state.isError_p = true;
        state.message_p = action.payload;
      })

      // Get all products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading_p = true;
        state.isSuccess_p = false;
        state.isError_p = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading_p = false;
        state.isSuccess_p = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading_p = false;
        state.isError_p = true;
        state.message_p = action.payload;
      })
    }
}); 

  // Export Reducer
  export const { reset_p } = productSlice.actions;
  export default productSlice.reducer;