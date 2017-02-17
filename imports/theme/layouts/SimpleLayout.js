import React, { Component, PropTypes } from 'react';

const { node } = PropTypes;

export default class SimpleLayout extends Component {
  static propTypes = {
    children: node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className="simple-layout">
        {children}
      </div>
    );
  }
}
