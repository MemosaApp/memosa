import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IonContent, IonNavView, IonView, IonNavBar, IonSideMenuContainer, IonSideMenus, IonSideMenuContent } from 'reactionic';

import { APP_NAME } from '/imports/app/constants';

const { arrayOf, node, object, oneOfType, string } = PropTypes;

class Layout extends Component {
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
    // Wait a few frames
    setTimeout(() => {
      const { ionSnapper } = this.context;

      if (ionSnapper) {
        ionSnapper.settings({
          disable: 'right',
          touchToDrag: false,
          hyperextensible: false,
        });
        ionSnapper.on('open', () => {
          window.document.body.className += ' menu-open';
        });
        ionSnapper.on('close', () => {
          window.document.body.className = window.document.body.className.replace('menu-open', '');
        });

        const modalOverlay = window.document.createElement('DIV');
        modalOverlay.className += 'menu-overlay';
        window.document.body.appendChild(modalOverlay);

        window.document.getElementsByClassName('menu-overlay')[0].addEventListener('click', () => {
          ionSnapper.close();
        });
      } else {
        // TODO try again later
      }
    }, 0);
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
        {
          SideMenuComponents ?
            <IonSideMenus>
              {SideMenuComponents}
            </IonSideMenus> :
          null
        }
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

const mapStateToProps = (state) => {
  return {
    ...state.navigation.options,
  };
};

export default connect(mapStateToProps)(Layout);
