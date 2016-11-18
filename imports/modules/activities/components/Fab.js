import React, { Component, PropTypes } from 'react';
import Fab, { FabButton, FabActions, FabAction } from '/imports/Fab';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
          <i className="ion-android-add"></i>
        </FabButton>
        <FabActions>
          <FabAction
            className="button button-royal"
            onClick={this.handleCreateGroup}
            tooltip="Create Group"
          >
            <i className="ion-ios-people"></i>
          </FabAction>
          <FabAction
            className="button button-balanced"
            onClick={this.handleCreateNote}
            tooltip="Create Note"
          >
            <i className="ion-edit"></i>
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
