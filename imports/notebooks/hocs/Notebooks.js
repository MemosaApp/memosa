import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connectFactory } from 'react-hocs';

import NotebooksCollection from '../collections';

const { node } = PropTypes;

/**
 * Connect to the Notebooks store
 */
class Notebooks extends Component {
  static propTypes = {
    children: node,
  }

  render() {
    const { children, ...props } = this.props;

    return React.cloneElement(children, {
      ...props,
      notebooksReady: false,
      notebooks: [],
    });
  }
}

const mapMeteorToProps = () => {
  const notebooksHandle = Meteor.subscribe('notebooks.mine');

  const notebooksReady = notebooksHandle.ready();
  const notebooks = notebooksReady ? NotebooksCollection.find() : null;

  return {
    notebooksReady,
    notebooks,
    handleCreateNotebook: (...args) => {
      return Meteor.call('notebooks.insert', ...args);
    },
  };
};

export default connectFactory(
  createContainer(
    mapMeteorToProps, Notebooks
  )
);
