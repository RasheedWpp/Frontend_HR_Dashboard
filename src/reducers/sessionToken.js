import { session_Token } from '../actions/user';

const initialState = {
    value: "token",
  };
  
  const sessionTokenReducer = (state = initialState, action) => {
    switch (action.type) {
      case session_Token:
        return {
          ...state,
          value: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default sessionTokenReducer;
  