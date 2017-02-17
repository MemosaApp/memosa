import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';

import track from '/imports/support/analytics';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

const middleware = routerMiddleware(browserHistory);
export const store = createStore(reducers, applyMiddleware(middleware));

export const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => track({
  pathname: location.pathname,
}));
