import { Meteor } from 'meteor/meteor';

export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};

export const isLoggedOut = () => {
  return !Meteor.userId();
};
