import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const registerUser = {
  _id: '62b9b6afc894e3fe031db1a9',
  user_name: 'registerUser',
  email: 'testing@registration.com',
  password: 'registerUser!',
}

// Adding mock network response that is used in tests
const mockNetworkResponse = () => {

const mock = new MockAdapter(axios);

// Mock response for register user
mock.onPost(`/api/users/`).reply(200, registerUser);
}

export {
  mockNetworkResponse,
  registerUser,
}