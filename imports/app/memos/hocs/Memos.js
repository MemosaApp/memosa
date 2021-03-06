import React, { Component, PropTypes } from 'react';
import {
  createInjectableService,
} from '/imports/support/dependencyInjections/services';

const { arrayOf, bool, node, shape } = PropTypes;

/**
 * Connect to the Memos store
 */
class Memos extends Component {
  static propTypes = {
    children: node,
    memos: arrayOf(shape({
      // TODO
    })),
    memosReady: bool,
  }

  render() {
    const {
      children,
      memos,
      memosReady,
      ...props
    } = this.props;

    return React.cloneElement(children, {
      ...props,
      memosReady,
      memos,
    });
  }
}

const mapDataToProps = ({ container, notebookId }) => {
  const handleSubscribe = container.handleSubscribe;
  const handleCall = container.handleCall;
  const MemosCollection = container.Memos;

  const memosHandle = handleSubscribe('memos', notebookId);

  const memosReady = memosHandle.ready();
  const memos = memosReady ? MemosCollection.find().fetch() : null;

  return {
    memosReady,
    memos,
    handleCreateMemo: (...args) => {
      return handleCall('memos.insert', ...args);
    },
    handleUpdateMemo: (...args) => {
      return handleCall('memos.update', ...args);
    },
  };
};

export default createInjectableService(mapDataToProps)(Memos);
