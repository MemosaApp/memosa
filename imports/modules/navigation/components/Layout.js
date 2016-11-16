import React, { Component, PropTypes } from 'react';
import { IonNavView, IonView, IonNavBar, IonSideMenuContainer, IonSideMenus, IonSideMenuContent } from 'reactionic';

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
    title: '',
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
              {React.cloneElement(children, {})}
            </IonView>
          </IonNavView>
        </IonSideMenuContent>
      </IonSideMenuContainer>
    );
  }
}
