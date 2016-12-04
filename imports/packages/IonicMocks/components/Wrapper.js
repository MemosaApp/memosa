import { Component, PropTypes } from 'react';

const { node, object } = PropTypes;

/**
 * This component simply wraps components, but
 * exposes context types to your children for
 * testing
 *
 * ```
 * import { Wrapper, context } from 'IonicMocks';
 *
 * // ...
 *
 * const wrapper = mount(
 *   <Wrapper><MyComponent /></Wrapper>,
 *   { context }
 * );
 * ```
 */
export default class Wrapper extends Component {
  static propTypes = {
    children: node,
  }

  static contextTypes = {
    ionPlatform: object,
  }

  render() {
    return (this.props.children);
  }
}
