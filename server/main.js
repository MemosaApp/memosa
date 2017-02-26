import { Meteor } from 'meteor/meteor';

import '/imports/app/entities/collections';
import '/imports/app/memos/collections';
import '/imports/app/notebooks/collections';
import './modules/auth/startup/config';
import './modules/urls/startup/config';

Meteor.startup(() => {
  // code to run on server at startup
});
