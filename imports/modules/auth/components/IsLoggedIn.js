import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const { bool, node } = PropTypes;

class IsLoggedIn extends Component {
  static propTypes = {
    Indeterminate: node,
    loggedIn: bool,
    LoggedIn: node.isRequired,
    NotLoggedIn: node.isRequired,
  }

  static defautlProps = {
    loggedIn: false,
    Indeterminate: <div />,
  }

  render() {
    const { loggedIn, LoggedIn, NotLoggedIn, Indeterminate } = this.props;

    switch (loggedIn) {
    case true:
      return LoggedIn;
    case false:
      return NotLoggedIn;
    default:
      return Indeterminate;
    }
  }
}

const mapDataToProps = () => {
  const loggedIn = Boolean(Meteor.userId());
  // const loggingIn = Meteor.loggingIn();

  return {
    loggedIn,
  };
};

export default createContainer(mapDataToProps, IsLoggedIn);
