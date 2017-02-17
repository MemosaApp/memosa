import React, { Component, PropTypes } from 'react';
import connectAuth from '../hocs/Auth';

const { func } = PropTypes;

class RegisterForm extends Component {
  static propTypes = {
    handleRegister: func,
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

    const { handleRegister } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    const overrideCallback = (onSuccess, onFailure, handleLogin) => {
      return (error) => {
        this.setState({
          isLoading: false,
        });

        if (error) {
          onFailure(error);
        }

        handleLogin(email, password, (loginError) => {
          if (loginError) {
            onFailure(loginError);
          }

          onSuccess();
        });
      };
    };

    this.setState({
      isLoading: true,
    }, () => {
      handleRegister(email, password, overrideCallback);
    });
  }

  render() {
    return (
      <form
        id="register"
        className="register-form"
        onSubmit={this.handleSubmit}
      >

        <div className="register-form__group">
          <label htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            type="email"
            ref={(ref) => { this.email = ref; }}
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="password">
            Your password
          </label>
          <input
            id="password"
            type="password"
            ref={(ref) => { this.password = ref; }}
          />
        </div>

        <button onClick={this.handleSubmit}>Sign Up</button>
      </form>
    );
  }
}

export { RegisterForm };

export default connectAuth()(RegisterForm);
