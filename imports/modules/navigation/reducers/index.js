import * as NAVIGATION from '../constants';

export default (state = {
  options: {},
}, action) => {
  switch (action.type) {
  case NAVIGATION.SET_NAVIGATION:
    return {
      ...state,
      options: action.options,
    };
  default:
    return state;
  }
};
