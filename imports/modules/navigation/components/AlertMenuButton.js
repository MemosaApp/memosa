import React, { Component } from 'react';
import { IonButton } from 'reactionic';

export default class AlertMenuButton extends Component {
  handleClick = (event) => {
    event.preventDefault();

    // TODO
  }

  getIcon = () => {
    return 'ion-android-notifications-none';
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
