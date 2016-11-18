import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import App from '/imports/modules/app/components/App';
import activitiesRoutes from '/imports/modules/activities/routes';
import notesRoutes from '/imports/modules/notes/routes';
import reducers from '/imports/reducers';

const middleware = routerMiddleware(browserHistory)
const store = createStore(reducers, applyMiddleware(middleware));

const history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} path="/">
        {activitiesRoutes}
        {notesRoutes}
      </Route>
    </Router>
  </Provider>
)
