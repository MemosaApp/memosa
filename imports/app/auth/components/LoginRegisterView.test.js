import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bottle from 'bottlejs';
import sinon from 'sinon';
import { LoginRegisterView } from './LoginRegisterView';
import { REGISTER_VIEW } from '../constants';

describe('<LoginRegisterView />', () => {
  const bottle = new Bottle();
  const track = sinon.spy();
  bottle.service('track', () => track);

  it('renders the Login component when logging in', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          container: bottle,
        },
      }
    );

    expect(wrapper.text()).to.contain('Log In');
  });

  it('renders the Register component when registering', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          container: bottle,
        },
      }
    );

    wrapper.setState({
      view: REGISTER_VIEW,
    });

    expect(wrapper.text()).to.contain('Sign Up');
  });

  it('changes to the register form when clicking the sign up button', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          container: bottle,
        },
      }
    );

    wrapper.find('button#signupSwitch').simulate('click');

    expect(wrapper.text()).to.contain('Sign Up');
  });

  it('changes to the login form when clicking the login button', () => {
    const wrapper = mount(
      <LoginRegisterView />,
      {
        context: {
          container: bottle,
        },
      }
    );

    wrapper.find('button#loginSwitch').simulate('click');

    expect(wrapper.text()).to.contain('Log In');
  });

  it.skip('calls track when login success', () => {

  });

  it.skip('calls track when register success', () => {

  });
});
