import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const { node } = PropTypes;

const GooeySvg = () => (
  <svg>
    <defs>
      <filter id="shadowed-goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
        <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
        {/* <feBlend in2="shadow" in="goo" result="goo" /> */}
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
  </svg>
);

export default class GooeyMenu extends Component {
  static propTypes = {
    button: node,
    children: node,
  }

  state = {
    isOpen: false,
  }

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { button, children } = this.props;
    const itemClassName = 'gooey-menu__item';

    const classNames = classnames(
      'gooey-menu',
      {
        'gooey-menu--open': isOpen,
      },
    );

    return (
      <nav className={classNames}>
        <button
          className="gooey-menu__open__button"
          onClick={this.handleToggle}
        >
          <span className="gooey-menu__line gooey-menu__line-1" />
          <span className="gooey-menu__line gooey-menu__line-2" />
          <span className="gooey-menu__line gooey-menu__line-3" />
        </button>

        {React.Children.map(children, (child, i) => {
          const menuItems = React.Children.count(children);
          const openDistance = 80; // px
          const openingAngle = Math.PI - (1.0 / menuItems);
          const angle = ((Math.PI - openingAngle) / 2.0) + ((openingAngle / (menuItems - 1)) * (i));
          const translateX = isOpen ? Math.cos(angle) * openDistance : 0;
          const translateY = isOpen ? Math.sin(angle) * openDistance : 0;

          return React.cloneElement(child, {
            ...child.props,
            className: child.props.className ? `${child.props.className} ${itemClassName}` : itemClassName,
            style: {
              ...(child.props.style ? child.props.style : {}),
              transform: `translate3d(${Math.round(translateX)}px, ${Math.round(translateY)}px, 0)`,
            },
          });
        })}

        <GooeySvg />
      </nav>
    );
  }
}
