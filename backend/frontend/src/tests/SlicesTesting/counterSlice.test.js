import { cleanup } from "@testing-library/react";
import counterReducer, {
  increment,
  reset_c,
} from "../../features/counter/counterSlice";

afterEach(cleanup);

describe('counter reducer', () => { 
  const initialState = {
    value: 0,
  };

  it('handle increment', () => {
    const state = counterReducer(initialState, increment());
    expect(state).toEqual({ value: 1 });
  });

  it('handle reset_c', () => {
    const state = counterReducer(initialState, reset_c());
    expect(state).toEqual(initialState);
  });

 })