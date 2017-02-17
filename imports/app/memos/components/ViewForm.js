import React, { Component, PropTypes } from 'react';
import { bind } from 'react-hocs';
import { Modal } from 'reactionic-modal';
import md5 from 'md5';

import { connectValidation } from '/imports/support/validation';
import connectNavigation from '/imports/app/navigation/hocs/Navigation';
import SelectModal from '/imports/app/notebooks/components/SelectModal';

import MemoInputGroup from './MemoInputGroup';
import connectNotebooks from '../hocs/Memos';

const { func, object, shape, string } = PropTypes;

class ViewMemosForm extends Component {
  static propTypes = {
    handleCreateMemo: func.isRequired,
    handleSetNavigation: func.isRequired,
    handleUpdateMemo: func.isRequired,
    memo: shape({
      body: string,
    }),
  }

  static contextTypes = {
    containers: object,
    ionUpdatePopup: func,
  }

  state = {
    errors: null,
    isEmpty: true,
    lastSaveHash: null,
    memo: {
      body: null,
    },
  }

  componentWillMount() {
    const { memo } = this.props;

    if (memo) {
      this.setState({
        isEmpty: false,
        lastSaveHash: md5(memo.body),
        memo,
      });
    }
  }

  componentDidMount() {
    this.inputGroup.focus();
  }

  promptIfDirty = (callback) => {
    const { ionUpdatePopup } = this.context;
    const isHashDifferent = md5(this.state.memo) !== this.state.lastSaveHash;

    if (isHashDifferent) {
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

  handleUpdateNavigation = () => {
    const { handleSetNavigation } = this.props;
    const hasContent = !this.state.isEmpty;
    const isHashDifferent = md5(this.state.memo.body) !== this.state.lastSaveHash;

    if (hasContent && isHashDifferent) {
      handleSetNavigation({
        onBeforeLeave: (callback) => {
          this.promptIfDirty(callback);
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
  }

  handleMemoChange = (event) => {
    this.setState(
      {
        memo: {
          ...this.state.memo,
          body: event.jsonContent,
        },
        isEmpty: event.isEmpty,
      },
      this.handleUpdateNavigation
    );
  }

  handleAttemptSave = () => {
    const { memo } = this.state;

    if (!memo._id) {
      this.setState({
        isNotebookModalOpen: true,
      });
    } else {
      this.handleSave(memo);
    }
  }

  handleNotebookSelect = (notebookId) => {
    this.setState({
      isNotebookModalOpen: false,
      memo: {
        ...this.state.memo,
        notebookId,
      },
    }, () => {
      this.handleSave({
        ...this.state.memo,
        notebookId,
      });
    });
  }

  handleSave = (memo) => {
    if (!memo._id) {
      // Create a memo
      this.props.handleCreateMemo(memo, (err, id) => {
        if (err) {
          this.setState({
            errors: {
              create: 'Failed to create your memo, please try again later',
            },
          });
        }

        this.setState({
          memo: {
            ...this.state.memo,
            _id: id,
          },
        });
      });
    } else {
      // Create an existing memo
      this.props.handleUpdateMemo(memo._id, memo, (err) => {
        if (err) {
          this.setState({
            errors: {
              create: 'Failed to save your memo, please try again later',
            },
          });
        }
      });
    }

    this.setState({
      lastSaved: +new Date(),
      lastSaveHash: md5(memo.body),
    }, this.handleUpdateNavigation);
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
    const { isNotebookModalOpen, memo } = this.state;

    return (
      <div className="notes__form">
        <MemoInputGroup
          defaultValue={memo.body}
          onChange={this.handleMemoChange}
          ref={(inputGroup) => { this.inputGroup = inputGroup; }}
        />

        <Modal
          isOpen={isNotebookModalOpen}
        >
          <SelectModal
            defaultValue={memo.notebookId}
            onCancel={this.handleCloseNotebookModal}
            onNotebookSelect={this.handleNotebookSelect}
          />
        </Modal>
      </div>
    );
  }
}

export default bind(
  connectValidation(),
  connectNotebooks(),
  connectNavigation(),
)(ViewMemosForm);
