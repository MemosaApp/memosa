import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('has a email field', () => {
    const wrapper = shallow(
      <LoginForm />
    );

    expect(wrapper.find('#email')).to.be.length(1);
  });

  it('has a password field', () => {
    const wrapper = shallow(
      <LoginForm />
    );

    expect(wrapper.find('#password')).to.be.length(1);
  });

  it('calls handle callback when form is submitted', () => {
    const email = 'test@test.com';
    const password = 'testing';

    const handleLogin = sinon.spy();
    const wrapper = mount(
      <LoginForm
        handleLogin={handleLogin}
      />
    );

    wrapper.find('#email').node.value = email;
    wrapper.find('#password').node.value = password;
    wrapper.find('#login').simulate('submit');

    expect(handleLogin).to.have.been.calledOnce;
    expect(handleLogin).to.have.been.calledWith(
      email,
      password
    );
  });

  it('has a focus method', () => {
    const wrapper = mount(
      <LoginForm />
    );

    expect(wrapper.get(0).focus).to.be.a.function;
  });

  it('has a submit button', () => {
    const wrapper = mount(
      <LoginForm />
    );

    expect(wrapper.find('button')).to.be.length(1);
  });

  it('submits when the button is clicked', () => {
    const email = 'test@test.com';
    const password = 'testing';

    const handleLogin = sinon.spy();
    const wrapper = mount(
      <LoginForm
        handleLogin={handleLogin}
      />
    );

    wrapper.find('#email').node.value = email;
    wrapper.find('#password').node.value = password;
    wrapper.find('button').simulate('click');

    expect(handleLogin).to.have.been.calledOnce;
    expect(handleLogin).to.have.been.calledWith(
      email,
      password
    );
  });

  it.skip('disables submitting the form while loading', () => {

  });
});
