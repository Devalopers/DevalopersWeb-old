import { combineReducers } from 'redux';
import adminReducer from './Admin/reducer';
import companyReducer from './Company/reducer';

export default combineReducers({
  admin: adminReducer,
  company: companyReducer,
  // Add company && developer reducers here
});
