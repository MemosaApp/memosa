import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import navigationReducer from '/imports/navigation/reducers';

export default combineReducers(
  {
    navigation: navigationReducer,
    routing: routerReducer,
  }
);
