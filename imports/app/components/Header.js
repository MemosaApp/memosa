import React, { Component, PropTypes } from 'react';

const { node } = PropTypes;

export default class Header extends Component {
  static propTypes = {
    children: node,
  }

  render() {
    const { children } = this.props;

    return (
      <header>
        {children}
      </header>
    );
  }
}
