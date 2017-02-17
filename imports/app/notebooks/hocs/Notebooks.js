import React, { Component, PropTypes } from 'react';
import {
  createInjectableService,
} from '/imports/support/dependencyInjections/services';

const { arrayOf, bool, node, shape } = PropTypes;

/**
 * Connect to the Notebooks store
 */
class Notebooks extends Component {
  static propTypes = {
    children: node,
    notebooks: arrayOf(shape({

    })),
    notebooksReady: bool,
  }

  render() {
    const {
      children,
      notebooks,
      notebooksReady,
      ...props
    } = this.props;

    return React.cloneElement(children, {
      ...props,
      notebooksReady,
      notebooks,
    });
  }
}

const mapDataToProps = ({ container }) => {
  const handleSubscribe = container.handleSubscribe;
  const handleCall = container.handleCall;
  const NotebooksCollection = container.Notebooks;

  const notebooksHandle = handleSubscribe('notebooks.mine');

  const notebooksReady = notebooksHandle.ready();
  const notebooks = notebooksReady ? NotebooksCollection.find().fetch() : null;

  return {
    notebooksReady,
    notebooks,
    handleCreateNotebook: (...args) => {
      return handleCall('notebooks.insert', ...args);
    },
  };
};

export default createInjectableService(mapDataToProps)(Notebooks);
