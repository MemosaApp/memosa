import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const { bool, node, string } = PropTypes;

export default class FabAction extends Component {
  static propTypes = {
    active: bool,
    children: node,
    tooltip: string,
  }

  render() {
    const { active, children, tooltip, ...props } = this.props;

    const className = classnames(
      'fab-action',
      {
        'fab-action--active': active,
      }
    );

    const tooltipClassName = classnames(
      'fab-tooltip',
      {
        'fab-tooltip--active': active,
      }
    );

    const button = (
      <button className={className} {...props}>
        {
          React.Children.map(children, (element, index) => {
            const options = {
              active,
              key: index,
            };

            return React.cloneElement(element, options);
          })
        }
      </button>
    );

    if (tooltip) {
      return (
        <div>
          <div className={tooltipClassName}>
            {tooltip}
          </div>
          {button}
        </div>
      );
    } else {
      return (
        button
      );
    }
  }
}
