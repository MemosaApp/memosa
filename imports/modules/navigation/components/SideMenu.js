import React, { Component } from 'react';
import { IonSideMenu } from 'reactionic';

export default class SideMenu extends Component {
  render() {
    return (
      <IonSideMenu customClasses="side-menu">
        <div className="bar bar-header bar-stable">
          <h1 className="title">Left Menu</h1>
        </div>
        <div className="content has-header side-menu">
          <div className="list">
            Meow
          </div>
        </div>
      </IonSideMenu>
    );
  }
}
