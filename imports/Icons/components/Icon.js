import React, { Component, PropTypes } from 'react';

const { bool, object, string } = PropTypes;

export default class Icon extends Component {
  static propTypes = {
    hidden: bool,
    label: string,
    iosIcon: string,
    defaultIcon: string.isRequired,
  }

  static contextTypes = {
    ionPlatform: object,
  }

  static defaultProps = {
    hidden: true,
  }

  isIos = () => {
    return this.context.ionPlatform.isIos;
  }

  render() {
    const {
      hidden,
      label,
      iosIcon,
      defaultIcon,
      ...props,
    } = this.props;

    const className = this.isIos() && iosIcon ? iosIcon : defaultIcon;

    const additionalProps = {
      ...props,
    };

    if (hidden) {
      additionalProps['aria-hidden'] = 'true';
    } else if (label) {
      additionalProps['aria-label'] = label;
    }

    return (
      <i className={className} {...additionalProps}></i>
    );
  }
}
