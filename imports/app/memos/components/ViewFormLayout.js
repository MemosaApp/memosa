import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IonContent, IonNavView, IonView, IonNavBar } from 'reactionic';
import classnames from 'classnames';

import GooeyMenu from '/imports/theme/navs/GooeyMenu';
import IconButton from '/imports/theme/buttons/IconButton';
import MemoIcon from '/imports/theme/icons/MemoIcon';
import { APP_NAME } from '/imports/app/main/constants';
import {
  NOTEBOOKS_ROUTE,
} from '/imports/app/notebooks/constants';

const { func, node, object, oneOfType, string } = PropTypes;

class ViewFormLayout extends Component {
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

  state = {
    isTransitioning: false,
  }

  handleNavigate = (event) => {
    event && event.preventDefault();

    const { onBeforeLeave } = this.props;

    if (onBeforeLeave) {
      onBeforeLeave(this.navigateToNotebooks);
    } else {
      this.navigateToNotebooks();
    }
  }

  navigateToNotebooks = () => {
    this.setState({
      isTransitioning: true,
    }, () => {
      setTimeout(() => {
        this.props.handlePush(
          `/${NOTEBOOKS_ROUTE}`
        );
      }, 200);
    });
  }

  render() {
    const {
      children,
      navBarClasses,
      leftButton,
      rightButton,
    } = this.props;
    const { isTransitioning } = this.state;

    const buttonClassNames = classnames(
      'view-form-layout__button',
      {
        'view-form-layout__button--transitioning': isTransitioning,
      },
    );

    return (
      <div>
        <IonNavBar
          customClasses={`${navBarClasses} bar--transparent bar--tall`}
          leftButton={leftButton}
          rightButton={rightButton}
          title={
            <div className="view-form-layout">
              <GooeyMenu>
                <a href="#">
                  +
                </a>
                <IconButton
                  className={buttonClassNames}
                  onClick={this.handleNavigate}
                >
                  <MemoIcon size={40} />
                </IconButton>
                <a href="#">
                  +
                </a>
              </GooeyMenu>
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
)(ViewFormLayout);
