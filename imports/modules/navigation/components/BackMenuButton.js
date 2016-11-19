import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { IonButton } from 'reactionic';

const { func, object } = PropTypes;

class BackMenuButton extends Component {
  static propTypes = {
    beforeNavigation: func,
    handleGoBack: func,
  }

  static defaultProps = {
    beforeNavigation: (c) => { c(); }
  }

  static contextTypes = {
    ionPlatform: object,
  }

  handleClick = (event) => {
    event.preventDefault();

    const { beforeNavigation, handleGoBack } = this.props;

    beforeNavigation(handleGoBack);
  }

  getIcon = () => {
    return this.context.ionPlatform.isIos ? 'ion-ios-arrow-back' : 'ion-android-arrow-back';
  }

  render() {
    return (
      <IonButton
        icon={this.getIcon()}
        onClick={this.handleClick}
        type="clear"
      />
    );
  }
}

export { BackMenuButton };

const mapDispatchToProps = (dispatch) => {
  return {
    handleGoBack: () => dispatch(goBack()),
  };
};

export default connect(null, mapDispatchToProps)(BackMenuButton);
