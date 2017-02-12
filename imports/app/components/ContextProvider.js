import { Component, PropTypes } from 'react';
import Bottle from 'bottlejs';

import track from '/imports/analytics';
import {
  LoginForm,
  RegisterForm,
} from '/imports/auth';
import {
  NotebookSelectModal,
} from '/imports/notebooks';

const bottle = new Bottle();

bottle.service('track', () => track);
bottle.service('LoginForm', () => LoginForm);
bottle.service('RegisterForm', () => RegisterForm);
bottle.service('NotebookSelectModal', () => NotebookSelectModal);

const { node, object } = PropTypes;

export default class ContextProvider extends Component {
  static propTypes = {
    children: node,
  }

  static childContextTypes = {
    containers: object,
  }

  getChildContext() {
    return {
      containers: bottle,
    };
  }

  render() {
    return this.props.children;
  }
}
