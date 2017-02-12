import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classnames from 'classnames';
import FadeIn from '/imports/animations/components/FadeIn';
import { LOGIN_VIEW, REGISTER_VIEW } from '../constants';

const { func, object } = PropTypes;

class LoginRegisterView extends Component {
  static propTypes = {
    handlePush: func.isRequired,
  }

  static contextTypes = {
    containers: object,
  }

  state = {
    isInitialMount: true,
    view: LOGIN_VIEW,
  }

  handleShowLogin = () => {
    this.setState({
      isInitialMount: false,
      view: LOGIN_VIEW,
    });
  }

  handleShowRegister = () => {
    this.setState({
      isInitialMount: false,
      view: REGISTER_VIEW,
    });
  }

  /**
   * Redirect the user on login success to
   * the home page
   */
  handleLoginSuccess = () => {
    const { handlePush } = this.props;
    const { containers } = this.context;

    // Track the login success
    containers.container.track({
      namespace: 'user.login',
      action: 'success',
    });

    handlePush('/');
  }

  /**
   * Redirect the user on register success to
   * the home page
   */
  handleRegisterSuccess = () => {
    const { handlePush } = this.props;
    const { containers } = this.context;

    // Track the login success
    containers.container.track({
      namespace: 'user.register',
      action: 'success',
    });

    handlePush('/');
  }

  renderType = () => {
    const { isInitialMount, view } = this.state;
    const { containers } = this.context;
    const LoginForm = containers.container.LoginForm;
    const RegisterForm = containers.container.RegisterForm;

    switch (view) {
    case LOGIN_VIEW:
      return (
        <FadeIn disableAnimation={isInitialMount} key="login">
          <div className="login-register__tab-content login-register__tab-content--login">
            <h2>Welcome Back</h2>
            <LoginForm
              onLoginSuccess={this.handleLoginSuccess}
            />
          </div>
        </FadeIn>
      );
    case REGISTER_VIEW:
    default:
      return (
        <FadeIn disableAnimation={isInitialMount} key="register">
          <div className="login-register__tab-content login-register__tab-content--register">
            <h2>Sign Up, It&rsquo;s Free!</h2>
            <RegisterForm
              onRegisterSuccess={this.handleRegisterSuccess}
            />
          </div>
        </FadeIn>
      );
    }
  }

  render() {
    const { view } = this.state;

    const loginClasses = classnames(
      'login-register-view__tab',
      {
        'login-register-view__tab--active': view === LOGIN_VIEW,
      }
    );

    const registerClasses = classnames(
      'login-register-view__tab',
      {
        'login-register-view__tab--active': view === REGISTER_VIEW,
      }
    );

    return (
      <div className="login-register-view">
        <div className="login-register-view__tab-group">
          <button
            className={loginClasses}
            id="loginSwitch"
            onClick={this.handleShowLogin}
          >
            Log In
          </button>
          <button
            className={registerClasses}
            id="signupSwitch"
            onClick={this.handleShowRegister}
          >
            Sign Up
          </button>
        </div>

        {this.renderType()}
      </div>
    );
  }
}

export { LoginRegisterView };

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handlePush(...args) {
    return dispatch(push(...args));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginRegisterView);
