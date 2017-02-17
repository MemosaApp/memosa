import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const { func, node, string } = PropTypes;

export default class IconButton extends Component {
  static propTypes = {
    children: node,
    className: string,
    onClick: func.isRequired,
  }

  render() {
    const {
      children,
      className,
      onClick,
      ...otherProps
    } = this.props;

    const classname = classnames(
      'button',
      'button--icon',
      className,
    );

    return (
      <button
        className={classname}
        onClick={onClick}
        {...otherProps}
      >
        <div>
          {children}
        </div>
      </button>
    );
  }
}
