import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bottle from 'bottlejs';
import LoginRegisterView from './LoginRegisterView';
import { REGISTER_VIEW } from '../constants';

describe('<LoginRegisterView />', () => {
  const bottle = new Bottle();
  const Login = () => (<div>Login</div>);
  const Register = () => (<div>Register</div>);

  bottle.service('LoginForm', Login);
  bottle.service('RegisterForm', Register);

  it('renders the Login component when logging in', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          containers: bottle,
        },
      }
    );

    expect(wrapper.text()).to.contain('Login');
  });

  it('renders the Register component when registering', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          containers: bottle,
        },
      }
    );

    wrapper.setState({
      view: REGISTER_VIEW,
    });

    expect(wrapper.text()).to.contain('Register');
  });

  it('changes to the register form when clicking the sign up button', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          containers: bottle,
        },
      }
    );

    wrapper.find('button#signupSwitch').simulate('click');

    expect(wrapper.text()).to.contain('Register');
  });

  it('changes to the login form when clicking the login button', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          containers: bottle,
        },
      }
    );

    wrapper.find('button#loginSwitch').simulate('click');

    expect(wrapper.text()).to.contain('Login');
  });
});
