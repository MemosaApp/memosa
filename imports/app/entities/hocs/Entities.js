import React, { Component, PropTypes } from 'react';
import {
  createInjectableService,
} from '/imports/support/dependencyInjections/services';

const { node } = PropTypes;

class Entities extends Component {
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

const mapDataToProps = ({ container }) => {
  const handleSubscribe = container.handleSubscribe;
  const EntitiesCollection = container.Entities;

  const entitiesHandle = handleSubscribe('entities.all');

  const entitiesReady = entitiesHandle.ready();
  const entities = entitiesReady ? EntitiesCollection.find() : null;

  return {
    entitiesReady,
    entities,
    handleUpload: (files) => {
      return files.map(file => {
        return EntitiesCollection.insert({
          file,
          streams: 'dynamic',
          chunkSize: 'dynamic',
        }, false /* TODO I'm not sure what this false does */);
      });
    },
  };
};

export default createInjectableService(mapDataToProps)(Entities);
