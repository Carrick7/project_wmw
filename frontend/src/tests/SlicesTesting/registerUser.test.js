import authReducer,{
  register,
} from '../../features/auth/authSlice';

describe('authReducer', () => {
  const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    user: null,
  }

  it('should return the initial state', () => {
    expect(authReducer(initialState, {})).toEqual({
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
      user: null,
    });
  });

  it('should handle register', () => {
    expect(authReducer(initialState, register.pending)).toEqual({
      isLoading: true,
      isError: false,
      isSuccess: false,
      message: '',
      user: null,
    });
  });
  
  it('should handle registration', () => {
    expect(authReducer(initialState, register.fulfilled)).toEqual({
      isLoading: false,
      isError: false,
      isSuccess: true,
      message: '',
  });
});

  // it('should handle registration error', () => {
  //   expect(authReducer(undefined, register.rejected)).toEqual({
  //     isLoading: false,
  //     isError: true,
  //     isSuccess: false,
  //     message: '',
  //     user: null,
  //   });
  // });

})