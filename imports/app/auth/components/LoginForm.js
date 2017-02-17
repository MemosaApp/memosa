import React, { Component, PropTypes } from 'react';
import connectAuth from '../hocs/Auth';

const { func } = PropTypes;

class LoginForm extends Component {
  static propTypes = {
    handleLogin: func,
  }

  state = {
    isLoading: false,
  }

  focus = () => {
    this.email.focus();
  }

  handleSubmit = (event) => {
    event && event.preventDefault();

    if (this.state.isLoading) {
      return;
    }

    const { handleLogin } = this.props;

    const overrideCallback = (onSuccess, onFailure) => {
      return (error) => {
        this.setState({
          isLoading: false,
        });

        if (error) {
          onFailure(error);
        }

        onSuccess();
      };
    };

    this.setState({
      isLoading: true,
    }, () => {
      handleLogin(this.email.value, this.password.value, overrideCallback);
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <form
        id="login"
        className="login-form"
        onSubmit={this.handleSubmit}
      >
        <div className="login-form__group">
          <label htmlFor="email">
            Your email
          </label>
          <input
            aria-label="Your email"
            id="email"
            type="email"
            ref={(ref) => { this.email = ref; }}
          />
        </div>

        <div className="login-form__group">
          <label htmlFor="password">
            Your password
          </label>
          <input
            aria-label="Your password"
            id="password"
            type="password"
            ref={(ref) => { this.password = ref; }}
          />
        </div>

        <button
          onClick={this.handleSubmit}
          disabled={isLoading}
        >
          Log In
        </button>
      </form>
    );
  }
}

export { LoginForm };

export default connectAuth()(LoginForm);
