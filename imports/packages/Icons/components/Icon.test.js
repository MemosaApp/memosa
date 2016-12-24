import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { context, Wrapper } from 'reactionic-mocks';

import Icon from './Icon';

describe('<Icon />', () => {
  it('renders the default icon', () => {
    const map = {
      Android: 'fa-android',
      Ios: 'fa-ios',
      Web: 'fa-web',
    };

    Object.keys(map).forEach((device) => {
      const options = {
        context: {
          ...context,
          ionPlatform: {
            ...context.ionPlatform,
            [`is${device}`]: true,
          },
        },
      };

      const wrapper = mount(
        <Wrapper>
          <Icon defaultIcon="fa-icon" />
        </Wrapper>,
        options
      );

      expect(wrapper.find('.fa-icon')).to.be.length(1);
    });

    // Mock the context for web, ios, and android
  });

  it('renders the icon types', () => {
    const map = {
      Android: 'fa-android',
      Ios: 'fa-ios',
      Web: 'fa-web',
    };

    Object.keys(map).forEach((device) => {
      const icon = map[device];

      const options = {
        context: {
          ...context,
          ionPlatform: {
            ...context.ionPlatform,
            [`is${device}`]: true,
          },
        },
      };

      const wrapper = mount(
        <Wrapper>
          <Icon
            defaultIcon="fa-icon"
            icons={{
              [device.toLowerCase()]: icon,
            }}
          />
        </Wrapper>,
        options
      );

      expect(wrapper.find(`.${icon}`)).to.be.length(1);
    });
  });

  it('adds an aria hidden prop', () => {
    const options = {
      context,
    };

    const wrapper = mount(
      <Wrapper>
        <Icon
          defaultIcon="fa-icon"
          hidden
        />
      </Wrapper>,
      options
    );

    expect(wrapper.html()).contains('aria-hidden="true"');
  });

  it('adds an aria label', () => {
    const options = {
      context,
    };

    const wrapper = mount(
      <Wrapper>
        <Icon
          defaultIcon="fa-icon"
          hidden={false}
          label="text"
        />
      </Wrapper>,
      options
    );

    expect(wrapper.html()).contains('aria-label="text"');
    expect(wrapper.html()).to.not.contain('aria-hidden="true"');
  });
});
