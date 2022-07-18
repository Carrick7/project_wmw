import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import receipt_listService from './receipt_listService';

const initialState = {
    receipt_lists: [],
    isError_rl: false,
    isLoading_rl: false,
    isSuccess_rl: false,
    message_rl: '',
}

// Create Receipt List
export const createReceiptList = createAsyncThunk(
    'receipt_list/create', async (receipt_listData, thunkAPI) => {
    try{
      // getting the token from the auth state
      const token = thunkAPI.getState().auth.user.token;
      return await receipt_listService.createReceiptList(receipt_listData, token);
    }
    catch(error) {
      const message_rl = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message_rl);
      }
    }
);

// get all receipt lists
export const getAllReceiptLists = createAsyncThunk(
  'receipt_list/getAll', async (_, thunkAPI) => {
  try{
    // getting the token from the auth state
    const token = thunkAPI.getState().auth.user.token;
    return await receipt_listService.getAllReceiptLists(token);
  }
  catch(error) {
    const message_rl = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message_rl);
    }
  }
);

// Delete Receipt List
export const deleteReceiptList = createAsyncThunk(
  'receipt_list/delete', async (id, thunkAPI) => {
  try{
    // getting the token from the auth state
    const token = thunkAPI.getState().auth.user.token;
    return await receipt_listService.deleteReceiptList(id, token);
  }
  catch(error) {
    const message_rl = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message_rl);
    }
  }
);

//Slice
export const receipt_listSlice = createSlice({
    name: 'receipt_list',
    initialState,
    reducers: {
      reset_rl: (state) => initialState
    },
    extraReducers: (builder) => {
    builder
      // Create Receipt List
      .addCase(createReceiptList.pending, (state) => {
        state.isLoading_rl = true;
      })
      .addCase(createReceiptList.fulfilled, (state, action) => {
        state.isLoading_rl = false;
        state.isSuccess_rl = true;
        state.receipt_lists.push(action.payload);
      })
      .addCase(createReceiptList.rejected, (state, action) => {
        state.isLoading_rl = false;
        state.isError_rl = true;
        state.message_rl = action.payload;
      })

      // Get all receipt lists
      .addCase(getAllReceiptLists.pending, (state) => {
        state.isLoading_rl = true;
      })
      .addCase(getAllReceiptLists.fulfilled, (state, action) => {
        state.isLoading_rl = false;
        state.isSuccess_rl = true;
        state.receipt_lists = action.payload;
      })
      .addCase(getAllReceiptLists.rejected, (state, action) => {
        state.isLoading_rl = false;
        state.isError_rl = true;
        state.message_rl = action.payload;
      })

      // Delete a receipt list
      .addCase(deleteReceiptList.pending, (state) => {
        state.isLoading_rl = true;
        state.isSuccess_rl = false;
        state.isError_rl = false;
      })
      .addCase(deleteReceiptList.fulfilled, (state, action) => {
        state.isLoading_rl = false;
        state.isSuccess_rl = true;
        state.receipt_lists = state.receipt_lists.filter((receipt_list) => receipt_list._id !== action.payload.id);
      })
      .addCase(deleteReceiptList.rejected, (state, action) => {
        state.isLoading_rl = false;
        state.isError_rl = true;
        state.message_rl = action.payload;
      })
    }
}); 

  // Export Reducer
  export const { reset_rl } = receipt_listSlice.actions;
  export default receipt_listSlice.reducer;