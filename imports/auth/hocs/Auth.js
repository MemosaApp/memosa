import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { connectFactory } from 'react-hocs';

const { func, node } = PropTypes;

const noop = () => {};

/**

If a login is successful, it will call onLoginSuccess with no arguments.

If a login is unsuccessful, onLoginFailure will be called with an error object, which
can have one of the following errors:

* “Unrecognized options for login request [400]” if user or password is undefined.
* “Match failed [400]” if user isn’t an Object or String, or password isn’t a String.
* “User not found [403]” if the email or username provided in user doesn’t belong to a registered user.
* “Incorrect password [403]” if the password provided is incorrect.
* “User has no password set [403]” if user doesn’t have a password.

*/
class Auth extends Component {
  static propTypes = {
    children: node,
    onLoginFailure: func,
    onLoginSuccess: func,
    onRegisterFailure: func,
    onRegisterSuccess: func,
  }

  static defaultProps = {
    onLoginFailure: noop,
    onLoginSuccess: noop,
    onRegisterFailure: noop,
    onRegisterSuccess: noop,
  }

  handleRegister = (email, password, overrideCallback) => {
    const {
      onRegisterSuccess,
      onRegisterFailure,
    } = this.props;

    const defaultCallback = (error) => {
      if (error) {
        onRegisterFailure(error);
      }

      this.handleLogin(email, password, (loginError) => {
        if (loginError) {
          onRegisterFailure(loginError);
        }

        onRegisterSuccess();
      });
    };

    const callback = overrideCallback ? overrideCallback(
      onRegisterSuccess,
      onRegisterFailure,
      this.handleLogin
    ) : defaultCallback;

    Accounts.createUser({
      email,
      password,
    }, callback);
  }

  /**
   * If you provide an optional override callback,
   * we will first call it with the onLoginSuccess
   * and onLoginFailure functions for you to call
   * manually
   */
  handleLogin = (email, password, overrideCallback) => {
    const {
      onLoginFailure,
      onLoginSuccess,
    } = this.props;

    const defaultCallback = (error) => {
      if (error) {
        onLoginFailure(error);
      }

      onLoginSuccess();
    };

    const callback = overrideCallback ? overrideCallback(
      onLoginSuccess,
      onLoginFailure
    ) : defaultCallback;

    return Meteor.loginWithPassword(email, password, callback);
  }

  handleLogout = () => {
    return Meteor.logout();
  }

  render() {
    const { children, ...props } = this.props;

    return React.cloneElement(children, {
      ...props,
      handleRegister: this.handleRegister,
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
    });
  }
}

export default connectFactory(Auth);
