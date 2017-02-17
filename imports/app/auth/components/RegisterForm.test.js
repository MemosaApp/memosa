import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { RegisterForm } from './RegisterForm';

describe('<RegisterForm />', () => {
  it('has a email field', () => {
    const wrapper = shallow(
      <RegisterForm />
    );

    expect(wrapper.find('#email')).to.be.length(1);
  });

  it('has a password field', () => {
    const wrapper = shallow(
      <RegisterForm />
    );

    expect(wrapper.find('#password')).to.be.length(1);
  });

  it('calls handle callback when form is submitted', () => {
    const email = 'test@test.com';
    const password = 'testing';

    const handleRegister = sinon.spy();
    const wrapper = mount(
      <RegisterForm
        handleRegister={handleRegister}
      />
    );

    wrapper.find('#email').node.value = email;
    wrapper.find('#password').node.value = password;
    wrapper.find('#register').simulate('submit');

    expect(handleRegister).to.have.been.calledOnce;
    expect(handleRegister).to.have.been.calledWith(
      email,
      password
    );
  });

  it('has a focus method', () => {
    const wrapper = mount(
      <RegisterForm />
    );

    expect(wrapper.get(0).focus).to.be.a.function;
  });

  it('has a submit button', () => {
    const wrapper = mount(
      <RegisterForm />
    );

    expect(wrapper.find('button')).to.be.length(1);
  });

  it('submits the form when the button is clicked', () => {
    const email = 'test@test.com';
    const password = 'testing';

    const handleRegister = sinon.spy();
    const wrapper = mount(
      <RegisterForm
        handleRegister={handleRegister}
      />
    );

    wrapper.find('#email').node.value = email;
    wrapper.find('#password').node.value = password;
    wrapper.find('button').simulate('click');

    expect(handleRegister).to.have.been.calledOnce;
    expect(handleRegister).to.have.been.calledWith(
      email,
      password
    );
  });

  it.skip('disables submitting the form while loading', () => {

  });
});
