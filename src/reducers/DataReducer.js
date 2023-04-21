import { SET_VALUE } from '../actions/user';

const initialState = {
    value: "ahmed",
  };
  
  const DataReducer = (state = initialState, action) => {
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
  
  export default DataReducer;
  