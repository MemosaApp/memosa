import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import Layout from '/imports/modules/navigation/components/Layout';

import App from '/imports/modules/app/components/App';
import activitiesRoutes from '/imports/modules/activities/routes';
import memosRoutes from '/imports/modules/memos/routes';
import reducers from '/imports/reducers';

const middleware = routerMiddleware(browserHistory)
const store = createStore(reducers, applyMiddleware(middleware));

const history = syncHistoryWithStore(browserHistory, store);


export default (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} path="/">
        <Route component={Layout}>
          {activitiesRoutes}
          {memosRoutes}
        </Route>
      </Route>
    </Router>
  </Provider>
)
