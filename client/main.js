import 'jquery';
import 'materialize-css';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import a11y from 'react-a11y';

import routes from '/imports/routes';

import reducers from '/imports/reducers';
import '/imports/modules/auth/startup/config';

const store = createStore(reducers);

Meteor.startup(() => {
  if (Meteor.isDevelopment) {
    a11y(React);
  }

  render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('render-target')
  );
});
