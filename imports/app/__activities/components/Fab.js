import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Fab, FabButton, FabActions, FabAction } from 'react-fab';
import Icon from 'reactionic-icons';

import { MEMO_ROUTE, MEMO_CREATE_ROUTE } from '/imports/app/memos/constants';
import { GROUP_CREATE_ROUTE } from '/imports/app/groups/constants';

const { func } = PropTypes;

class ActivityFab extends Component {
  static propTypes = {
    handlePush: func.isRequired,
  }

  handleCreateNote = (event) => {
    event && event.preventDefault();

    this.props.handlePush(
      `/${[MEMO_ROUTE, MEMO_CREATE_ROUTE].join('/')}`,
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
          <i className="" />
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
            tooltip="Create Memo"
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
