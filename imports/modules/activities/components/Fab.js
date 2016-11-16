import React, { Component, PropTypes } from 'react';
import Fab, { FabButton, FabActions, FabAction } from '/imports/Fab';

export default class ActivityFab extends Component {
  // TODO change the icons depending on the os
  render() {
    return (
      <Fab style={{ right: '20px', bottom: '20px' }}>
        <FabButton>
          <i className="ion-android-add"></i>
        </FabButton>
        <FabActions>
          <FabAction tooltip="Create Group">
            <i className="ion-ios-people"></i>
          </FabAction>
          <FabAction tooltip="Create Note">
            <i className="ion-edit"></i>
          </FabAction>
        </FabActions>
      </Fab>
    );
  }
}
