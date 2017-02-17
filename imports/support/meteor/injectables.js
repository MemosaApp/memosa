import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

import MemosCollection from '/imports/app/memos/collections';
import NotebooksCollection from '/imports/app/notebooks/collections';
import EntitiesCollection from '/imports/app/entities/collections';

export default (bottle) => {
  // Auth helpers
  bottle.service('handleLogout', () => Meteor.logout);
  bottle.service('handleLoginWithPassword', () => Meteor.loginWithPassword);
  bottle.service('handleRegister', () => Accounts.createUser);

  // React helpers
  bottle.service('createContainer', () => createContainer);

  // Collection helpers
  bottle.service('handleSubscribe', () => Meteor.subscribe);
  bottle.service('handleCall', () => Meteor.call);

  // Collections
  bottle.service('Entities', () => EntitiesCollection);
  bottle.service('Memos', () => MemosCollection);
  bottle.service('Notebooks', () => NotebooksCollection);

  return bottle;
};
