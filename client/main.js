import 'jquery';
import 'react-fastclick';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM, { render } from 'react-dom';

import a11y from 'react-a11y';

import '/imports/theme/init';
import routes from '/imports/routes';

import '/imports/app/auth/meteor/config';

Meteor.startup(() => {
  if (Meteor.isDevelopment) {
    a11y(React, {
      ReactDOM,
    });
  }

  render(
    routes,
    document.getElementById('render-target')
  );
});
