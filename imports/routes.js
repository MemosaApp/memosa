import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

import App from '/imports/app/main/components/App';
import ContextProvider from '/imports/support/dependencyInjections/ContextProvider';
import { routes as authRoutes } from '/imports/app/auth';
import { isLoggedOut } from '/imports/app/auth/meteor/utilities'; // NOTE direct meteor usage
import memosRoutes from '/imports/app/memos/routes';
import notebooksRoutes from '/imports/app/notebooks/routes';

import { store, history } from './store';

const requireAuth = (nextState, replace) => {
  if (isLoggedOut()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default (
  <Provider store={store}>
    <ContextProvider>
      <Router history={history}>
        <Route component={App} path="/">
          {authRoutes}

          <Route onEnter={requireAuth}>
            {memosRoutes}
            {notebooksRoutes}
          </Route>
        </Route>
      </Router>
    </ContextProvider>
  </Provider>
);
