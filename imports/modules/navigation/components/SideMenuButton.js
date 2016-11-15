import React, { Component, PropTypes } from 'react';
import { IonButton } from 'reactionic';

const { object } = PropTypes;

export default class SideMenuButton extends Component {
  static contextTypes = {
    ionSnapper: object,
    ionPlatform: object,
  }

  handleClick = (event) => {
    event.preventDefault();

    this.context.ionSnapper.toggle('left');
  }

  getIcon = () => {
    let icon = 'ion-navicon';
    if (this.context.ionPlatform.isAndroid) {
      icon = 'ion-android-more-vertical';
    }

    return icon;
  }

  render() {
    return (
      <IonButton
        icon={this.getIcon()}
        onClick={this.handleClick}
        type="clear"
      />
    );
  }
}
