import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IonContent, IonNavView, IonView, IonNavBar, IonSideMenuContainer, IonSideMenuContent } from 'reactionic';

import IconButton from '/imports/theme/components/IconButton';
import MemoIcon from '/imports/app/components/icons/memo';
import { APP_NAME } from '/imports/app/constants';

const { func, node, object, oneOfType, string } = PropTypes;

class Layout extends Component {
  static propTypes = {
    children: node,
    leftButton: node,
    navBarClasses: oneOfType([object, string]),
    onBeforeLeave: func,
    rightButton: node,
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

  handleNavigate = (event) => {
    event && event.preventDefault();

    const { onBeforeLeave } = this.props;
    let cancelLeave = false;

    if (onBeforeLeave) {
      cancelLeave = !onBeforeLeave();
    }

    if (!cancelLeave) {
      // XXX handle navigate
    }
  }

  render() {
    const {
      children,
      navBarClasses,
      leftButton,
      rightButton,
    } = this.props;

    return (
      <IonSideMenuContainer>
        <IonSideMenuContent>
          <IonNavBar
            customClasses={`${navBarClasses} bar--transparent bar--tall`}
            leftButton={leftButton}
            rightButton={rightButton}
            title={
              <div className="view-form-layout">
                <IconButton
                  className="view-form-layout__button"
                  onClick={this.handleNavigate}
                >
                  <MemoIcon size={40} />
                </IconButton>
              </div>
            }
          />
          <IonNavView customClasses="">
            <IonView customClasses="">
              <IonContent customClasses="content--bar-tall">
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
