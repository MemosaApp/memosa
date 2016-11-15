import { combineReducers } from 'redux';

// import itemsReducer from '/imports/modules/items/reducers';
// import searchReducer from '/imports/modules/search/reducers';

export default combineReducers(
  {
    temp: () => {return {};},
    // search: searchReducer,
    // items: itemsReducer,
  }
)
