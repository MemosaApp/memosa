import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Wrapper, context } from '/imports/packages/IonicMocks';

import { ActivityFab } from './Fab';

const { describe, it } = global;

const options = {
  context,
};

describe('Activity Fab', () => {
  it('renders FAB components', () => {
    const wrapper = shallow(
      <ActivityFab />
    );

    expect(wrapper.find('Fab')).to.have.length(1);
  });

  it('navigates to the note create route', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Wrapper>
        <ActivityFab
          handlePush={spy}
        />
      </Wrapper>,
      options
    );

    wrapper.find('.button-balanced').simulate('click');

    expect(spy).to.have.been.calledWith('/memos/new');
  });

  it('navigates to the group create route', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Wrapper>
        <ActivityFab
          handlePush={spy}
        />
      </Wrapper>,
      options
    );

    wrapper.find('.button-royal').simulate('click');

    expect(spy).to.have.been.calledWith('/groups/create');
  });
});
