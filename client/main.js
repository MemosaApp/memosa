import 'jquery';
import 'materialize-css';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import a11y from 'react-a11y';

import routes from '/imports/routes';

import '/imports/modules/auth/startup/config';

Meteor.startup(() => {
  if (Meteor.isDevelopment) {
    a11y(React);
  }

  render(
    routes,
    document.getElementById('render-target')
  );
});
