import React, { Component, PropTypes } from 'react';
import { IonBody } from 'reactionic';
import getPlatform from '../utilities/getPlatform';

const { node, object } = PropTypes;

export default class App extends Component {
  static propTypes = {
    children: node,
    location: object,
  }

  render() {
    const { children, location } = this.props;

    const platform = getPlatform();

    return (
      <IonBody location={location} platform={platform}>
        {React.cloneElement(children, {})}
      </IonBody>
    );
  }
}
