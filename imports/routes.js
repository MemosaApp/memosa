import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import track from '/imports/analytics';
import appRoutes from '/imports/app/routes';
import ContextProvider from '/imports/app/components/ContextProvider';

import reducers from './reducers';

const middleware = routerMiddleware(browserHistory);
const store = createStore(reducers, applyMiddleware(middleware));

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => track({
  pathname: location.pathname,
}));

export default (
  <Provider store={store}>
    <ContextProvider>
      <Router history={history}>
        {appRoutes}
      </Router>
    </ContextProvider>
  </Provider>
);
