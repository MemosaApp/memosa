import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import TransitionGroup from 'react-addons-css-transition-group';

const { bool, node } = PropTypes;

export default class ModalWrapper extends Component {
  static propTypes = {
    children: node,
    isOpen: bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen === false && this.props.isOpen === true) {
      // A toggle happened

      setTimeout(() => {
        this.setState({
          isOpen: false,
        });
      }, 200);
    } else {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
  }

  render() {
    const { isOpen } = this.state;
    const { children, ...props } = this.props;

    return (
      <Modal {...props} isOpen={isOpen}>
        <TransitionGroup
          transitionAppear
          transitionAppearTimeout={200}
          transitionEnter
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionName="custom-modal-animation"
        >
          {
            this.props.isOpen ?
            React.Children.map(children, (element, index) => {
              return React.cloneElement(element, {
                key: index,
              })
            }) :
            []
          }
        </TransitionGroup>
      </Modal>
    );
  }
}
