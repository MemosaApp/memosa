import React, { Component, PropTypes } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import connectValidation from './Validator';

const { func } = PropTypes;

class Stub extends Component {
  static propTypes = {
    validate: func,
  }

  render() {
    return (
      <div />
    );
  }
}

describe('connectValidation', () => {
  it('provides a validate function', () => {
    const Validator = connectValidation()(Stub);
    const wrapper = mount(
      <div>
        <Validator />
      </div>
    );

    expect(wrapper.find('Stub').props()).to.contain.key('validate');
    expect(wrapper.find('Stub').props().validate).to.be.a('function');
  });

  it.skip('validates values against rules', () => {

  });
});
