import React, { Component, PropTypes } from 'react';
import { bind } from 'react-hocs';

import connectNavigation from '/imports/app/navigation/hocs/Navigation';
import List from './List';

const { func } = PropTypes;

class ViewList extends Component {
  static propTypes = {
    handleSetNavigation: func.isRequired,
  }

  componentWillMount() {
    const { handleSetNavigation } = this.props;

    handleSetNavigation({
      leftButton: null,
      rightButton: null,
      sideMenus: null,
      onBeforeLeave: null,
    });
  }

  render() {
    return (
      <List />
    );
  }
}

export { ViewList };

export default bind(
  connectNavigation()
)(ViewList);
