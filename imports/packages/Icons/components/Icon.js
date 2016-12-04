import React, { Component, PropTypes } from 'react';

const { bool, object, shape, string } = PropTypes;

/**
 * The <Icon /> Component allows you to quickly create
 * accessible icons that also have different icons
 * depending on the platorm given by the ionPlatform
 * context.
 *
 * By default, all icons are hidden. You must provide
 * `hidden={false}` to make them visible to screenreaders.
 *
 * The component will warn if an Icon has `hidden={false}`
 * without `label` being set.
 *
 * Usage:
 *
 * ```jsx
 * <Icon
 *   defaultIcon="fa fa-icon"
 *   icons={{ android: 'fa fa-android', ios: 'fa fa-ios', web: 'fa fa-web }}
 * />
 * ```
 *
 * @param {string} defaultIcon - Required. The default icon.
 * @param {object} icons - Optional. Specific icons to use depending on the device
 * @param {boolean} hidden - Optional. Defaults to true. Whether the icon is hidden for screen readers
 * @param {string} label - Optional. Screen reader text.
 */
export default class Icon extends Component {
  static propTypes = {
    defaultIcon: string.isRequired,
    hidden: bool,
    icons: shape({
      android: string,
      ios: string,
      web: string,
    }),
    label: string,
  }

  static contextTypes = {
    ionPlatform: object,
  }

  static defaultProps = {
    hidden: true,
  }

  renderIcon = () => {
    const { icons = {}, defaultIcon } = this.props;

    if (this.context.ionPlatform.isIos) {
      return icons.ios || defaultIcon;
    } else if (this.context.ionPlatform.isAndroid) {
      return icons.android || defaultIcon;
    } else {
      return icons.web || defaultIcon;
    }
  }

  render() {
    const {
      hidden,
      label,
      ...props
    } = this.props;

    const className = this.renderIcon();

    // TODO remove invalid props for i tags
    const additionalProps = {
      ...props,
    };

    if (label) {
      additionalProps['aria-label'] = label;
    }

    if (hidden) {
      additionalProps['aria-hidden'] = 'true';
    } else if (!label) {
      console.warn('An Icon was set to not be hidden, but does not have label text');
    }

    return (
      <i className={className} {...additionalProps} />
    );
  }
}
