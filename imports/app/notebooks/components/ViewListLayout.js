import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IonContent, IonNavView, IonView, IonNavBar, IonSideMenuContainer, IonSideMenuContent } from 'reactionic';

import IconButton from '/imports/theme/buttons/IconButton';
import MemoIcon from '/imports/theme/icons/MemoIcon';
import { APP_NAME } from '/imports/app/main/constants';
import {
  NOTEBOOKS_ROUTE,
} from '/imports/app/notebooks/constants';
import FadeIn from '/imports/theme/animations/FadeIn';

const { func, node, object, oneOfType, string } = PropTypes;

class ViewListLayout extends Component {
  static propTypes = {
    children: node,
    handlePush: func.isRequired,
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

  handleNavigate = (event) => {
    event && event.preventDefault();

    this.navigateToNotebooks();
  }

  navigateToNotebooks = () => {
    this.props.handlePush('/');
  }

  render() {
    const {
      children,
      navBarClasses,
      leftButton,
      rightButton,
    } = this.props;

    return (
      <div>
        <IonNavBar
          customClasses={`${navBarClasses} bar--transparent bar--tall`}
          leftButton={leftButton}
          rightButton={rightButton}
          title={
            <div className="view-list-layout">
              <FadeIn>
                <IconButton
                  className="view-list-layout__button"
                  onClick={this.handleNavigate}
                >
                  <MemoIcon size={40} />
                </IconButton>
              </FadeIn>
            </div>
          }
        />
        <IonNavView customClasses="">
          <IonView customClasses="view-list-layout__view">
            <IonContent customClasses="content--bar-tall">
              <FadeIn>
                {React.cloneElement(children, {})}
              </FadeIn>
            </IonContent>
          </IonView>
        </IonNavView>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.navigation.options,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePush: (...args) => dispatch(push(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewListLayout);
