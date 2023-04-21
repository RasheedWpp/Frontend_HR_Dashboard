import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import DataReducer from './DataReducer';
import sessionTokenReducer from './sessionToken'

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  value: DataReducer,
  sessionToken:sessionTokenReducer,
});
