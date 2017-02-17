import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectFactory } from 'react-hocs';

import { setNavigation } from '../actions';

const { func, node } = PropTypes;

class Navigation extends Component {
  static propTypes = {
    children: node.isRequired,
    handleSetNavigation: func.isRequired,
  }

  render() {
    const { handleSetNavigation, children, ...props } = this.props;

    return React.cloneElement(children, {
      ...props,
      handleSetNavigation,
    });
  }
}

const mapDispatchToProps = dispatch => ({
  handleSetNavigation: (...args) => dispatch(setNavigation(...args)),
});

export default connectFactory(connect(null, mapDispatchToProps)(Navigation));
