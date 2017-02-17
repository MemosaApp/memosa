import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import navigationReducer from '/imports/app/navigation/reducers';

export default combineReducers(
  {
    navigation: navigationReducer,
    routing: routerReducer,
  }
);
