import React, { Component, PropTypes } from 'react';

import Layout from '/imports/modules/navigation/components/Layout';
import SideMenuButton from '/imports/modules/navigation/components/SideMenuButton';
import AlertMenuButton from '/imports/modules/navigation/components/AlertMenuButton';
import SideMenu from '/imports/modules/navigation/components/SideMenu';

import Fab from './Fab';

const { shape } = PropTypes;

class ActivityView extends Component {
  static propTypes = {
    params: shape({

    })
  }

  render() {
    return (
      <Layout
        leftButton={<SideMenuButton />}
        rightButton={<AlertMenuButton />}
        sideMenus={[<SideMenu key={1} />]}
      >
        <div>
          Hello
          <Fab />
        </div>
      </Layout>
    );
  }
}

export default ActivityView;
