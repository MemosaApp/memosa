import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { Modal } from 'reactionic-modal';

import { connectValidation } from '/imports/validation';

import { setNavigation } from '/imports/navigation/actions';
import MemoInputGroup from './MemoInputGroup';

const { func, object, shape } = PropTypes;

class ViewMemosForm extends Component {
  static propTypes = {
    handleSetNavigation: func.isRequired,
    memo: shape({

    }),
  }

  static contextTypes = {
    containers: object,
    ionUpdatePopup: func,
  }

  state = {
    errors: null,
    title: '',
  }

  componentDidMount() {
    this.inputGroup.focus();
  }

  promptIfDirty = (callback) => {
    const { title } = this.state;
    const { ionUpdatePopup } = this.context;

    if (title !== '') {
      ionUpdatePopup({
        popupType: 'confirm',
        title: 'You have unsaved changes',
        template: 'Are you sure you want to leave?',
        cancelType: 'button-danger',
        okText: 'Leave',
        onOk: () => {
          callback();
        },
        onCancel: () => {},
      });
    } else {
      callback();
    }
  }

  handleMemoChange = (event) => {
    this.setState({
      memo: event.jsonContent,
      isEmpty: event.isEmpty,
    }, () => {
      const { handleSetNavigation } = this.props;
      const hasContent = !this.state.isEmpty;

      if (hasContent) {
        handleSetNavigation({
          onBeforeLeave: () => {
            console.log('test');
            return true;
          },
          leftButton: null,
          rightButton: this.renderSaveButton(),
          sideMenus: null,
        });
      } else {
        this.props.handleSetNavigation({
          onBeforeLeave: null,
          leftButton: null,
          rightButton: null,
          sideMenus: null,
        });
      }
    });
  }

  handleAttemptSave = () => {
    if (this.props.memo) {
      this.setState({
        isNotebookModalOpen: true,
      });
    } else {
      this.handleSave();
    }
  }

  handleSave = () => {
    // XXX
  }

  handleCloseNotebookModal = () => {
    this.setState({
      isNotebookModalOpen: false,
    });
  }

  renderSaveButton = () => {
    return (
      <button
        className="button"
        onClick={this.handleAttemptSave}
      >
        Save
      </button>
    );
  }

  render() {
    const { isNotebookModalOpen } = this.state;
    const { memo } = this.props;
    const { containers } = this.context;

    const NotebookSelectModal = containers.container.NotebookSelectModal;

    return (
      <div className="notes__form">
        <MemoInputGroup
          defaultValue={memo}
          onChange={this.handleMemoChange}
          ref={(inputGroup) => { this.inputGroup = inputGroup; }}
        />

        <Modal
          isOpen={true || isNotebookModalOpen}
        >
          <NotebookSelectModal
            onCancel={this.handleCloseNotebookModal}
            onNotebookSelect={this.handleSave}
          />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetNavigation: (...args) => dispatch(setNavigation(...args)),
  };
};

export default bind(
  connectValidation(),
  connect(null, mapDispatchToProps)
)(ViewMemosForm);
