import { Component, PropTypes } from 'react';
import injectables from '/imports/support/meteor/injectables';

import track from '/imports/support/analytics';

import { getServiceProvider } from './services';

const bottle = getServiceProvider();

bottle.service('track', () => track);

injectables(bottle);

const { node, object } = PropTypes;

export default class ContextProvider extends Component {
  static propTypes = {
    children: node,
  }

  static childContextTypes = {
    container: object,
  }

  getChildContext() {
    return {
      container: bottle.container,
    };
  }

  render() {
    return this.props.children;
  }
}
