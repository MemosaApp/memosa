import React, { Component, PropTypes } from 'react';

const { node } = PropTypes;

export default class Footer extends Component {
  static propTypes = {
    children: node,
  }

  render() {
    const { children } = this.props;

    return (
      <footer>
        {children}
      </footer>
    );
  }
}
