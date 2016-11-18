import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import itemsReducer from '/imports/modules/items/reducers';
// import searchReducer from '/imports/modules/search/reducers';

export default combineReducers(
  {
    routing: routerReducer,
  }
)
