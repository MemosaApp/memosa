import React, { Component, PropTypes } from 'react';

import { APP_NAME } from '/imports/modules/app/constants';

import Layout from '/imports/modules/navigation/components/Layout';
import SideMenuButton from '/imports/modules/navigation/components/SideMenuButton';
import AlertMenuButton from '/imports/modules/navigation/components/AlertMenuButton';
import SideMenu from '/imports/modules/navigation/components/SideMenu';

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
        title={APP_NAME}
      >
        <div>Hello</div>
      </Layout>
    );
  }
}

export default ActivityView;
