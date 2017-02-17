import React, { Component, PropTypes } from 'react';
import { connectFactory } from 'react-hocs';

const { func, node, object } = PropTypes;

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

  static contextTypes = {
    container: object,
  }

  handleRegister = (email, password, overrideCallback) => {
    const {
      onRegisterSuccess,
      onRegisterFailure,
    } = this.props;
    const { container } = this.context;

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

    container.handleRegister({
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
    const { container } = this.context;

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

    return container.handleLoginWithPassword(email, password, callback);
  }

  handleLogout = () => {
    const { container } = this.context;
    return container.handleLogout();
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
