import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { ActivityFab } from './Fab';

const { describe, it } = global;

describe('Activity Fab', () => {
  it('renders FAB components', () => {
    const wrapper = shallow(
      <ActivityFab />
    );

    expect(wrapper.contains('<Fab />')).to.be.equal(true);
  });

  it('navigates to the note create route', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ActivityFab
        push={spy}
      />
    );

    wrapper.find('.button-balanced').simulate('click');

    expect(spy).to.have.been.calledWith('/notes/create');
  });

  it('navigates to the group create route', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ActivityFab
        push={spy}
      />
    );

    wrapper.find('.button-royal').simulate('click');

    expect(spy).to.have.been.calledWith('/groups/create');
  });
});
