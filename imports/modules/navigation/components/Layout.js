import React, { Component, PropTypes } from 'react';
import { IonContent, IonNavView, IonView, IonNavBar, IonSideMenuContainer, IonSideMenus, IonSideMenuContent } from 'reactionic';

import { APP_NAME } from '/imports/modules/app/constants';

const { arrayOf, node, object, oneOfType, string } = PropTypes;

export default class Layout extends Component {
  static propTypes = {
    children: node,
    leftButton: node,
    navBarClasses: oneOfType([object, string]),
    rightButton: node,
    sideMenus: arrayOf(node),
    title: string,
  }

  static defaultProps = {
    sideMenus: [],
    navBarClasses: '',
    title: APP_NAME,
  }

  static contextTypes = {
    ionSnapper: object,
  }

  componentDidMount() {
    this.context.ionSnapper.settings({ disable: 'right' })
  }

  render() {
    const {
      children,
      sideMenus: SideMenuComponents,
      navBarClasses,
      title,
      leftButton,
      rightButton,
    } = this.props;

    return (
      <IonSideMenuContainer>
        <IonSideMenus>
          {SideMenuComponents}
        </IonSideMenus>
        <IonSideMenuContent>
          <IonNavBar
            customClasses={navBarClasses}
            leftButton={leftButton}
            rightButton={rightButton}
            title={title}
          />
          <IonNavView customClasses="">
            <IonView customClasses="">
              <IonContent>
                {React.cloneElement(children, {})}
              </IonContent>
            </IonView>
          </IonNavView>
        </IonSideMenuContent>
      </IonSideMenuContainer>
    );
  }
}
