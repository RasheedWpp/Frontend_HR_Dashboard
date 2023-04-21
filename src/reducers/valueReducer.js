import { SET_VALUE } from '../actions/user';

const initialState = {
    value: "rasheed",
  };
  
  const valueReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_VALUE:
        return {
          ...state,
          value: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default valueReducer;
  