import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setNavigation } from '/imports/navigation/actions';
import SideMenuButton from '/imports/navigation/components/SideMenuButton';
import AlertMenuButton from '/imports/navigation/components/AlertMenuButton';
import SideMenu from '/imports/navigation/components/SideMenu';

import Fab from './Fab';

const { func } = PropTypes;

class ActivityView extends Component {
  static propTypes = {
    handleSetNavigation: func.isRequired,
  }

  componentWillMount() {
    this.props.handleSetNavigation({
      leftButton: <SideMenuButton />,
      rightButton: <AlertMenuButton />,
      sideMenus: [<SideMenu key={1} />],
    });
  }

  render() {
    return (
      <div>
        Hello
        <Fab />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetNavigation: (...args) => dispatch(setNavigation(...args)),
  };
};

export default connect(null, mapDispatchToProps)(ActivityView);
