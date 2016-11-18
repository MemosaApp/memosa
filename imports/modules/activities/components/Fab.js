import React, { Component, PropTypes } from 'react';
import Fab, { FabButton, FabActions, FabAction } from '/imports/Fab';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Icon from '/imports/Icons';

import { NOTE_ROUTE, NOTE_CREATE_ROUTE } from '/imports/modules/notes/constants';
import { GROUP_CREATE_ROUTE } from '/imports/modules/groups/constants';

const { func } = PropTypes;

class ActivityFab extends Component {
  static propTypes = {
    handlePush: func,
  }

  handleCreateNote = (event) => {
    event && event.preventDefault();

    this.props.handlePush(
      [NOTE_ROUTE, NOTE_CREATE_ROUTE].join('/')
    );
  }

  handleCreateGroup = (event) => {
    event && event.preventDefault();

    this.props.handlePush(GROUP_CREATE_ROUTE);
  }

  // TODO change the icons depending on the os
  render() {
    return (
      <Fab style={{ right: '20px', bottom: '20px' }}>
        <FabButton>
          <Icon
            defaultIcon="ion-android-add"
            iosIcon="ion-ios-plus-empty"
          />
          <i className=""></i>
        </FabButton>
        <FabActions>
          <FabAction
            className="button button-royal"
            onClick={this.handleCreateGroup}
            tooltip="Create Group"
          >
            <Icon
              defaultIcon="ion-android-people"
              iosIcon="ion-ios-people"
            />
          </FabAction>
          <FabAction
            className="button button-balanced"
            onClick={this.handleCreateNote}
            tooltip="Create Note"
          >
            <Icon
              defaultIcon="ion-edit"
            />
          </FabAction>
        </FabActions>
      </Fab>
    );
  }
}

export { ActivityFab };

const mapDispatchToProps = (dispatch) => {
  return {
    handlePush: (...args) => dispatch(push(...args)),
  };
};

export default connect(null, mapDispatchToProps)(ActivityFab);
