import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setNavigation } from '/imports/modules/navigation/actions';
import BackMenuButton from '/imports/modules/navigation/components/BackMenuButton';
import Error from '/imports/modules/app/components/Error';
import MemoInputGroup from './MemoInputGroup';

const { func } = PropTypes;

class MemosForm extends Component {
  static propTypes = {
    handleSetNavigation: func.isRequired,
  }

  static contextTypes = {
    ionUpdatePopup: func,
  }

  state = {
    error: null,
    title: '',
  }

  componentWillMount() {
    this.props.handleSetNavigation({
      leftButton: <BackMenuButton beforeNavigation={this.promptIfDirty} />,
    });
  }

  componentDidMount() {
    this._title.focus();
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
    });
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    }, this.validate.bind(this, 'title'));
  }

  validate = (element) => {
    const { title } = this.state;

    const validations = {
      title: [
        // Check title length
        () => {
          const TITLE_LENGTH = 250;
          if (title.length > TITLE_LENGTH) {
            this.setState({
              error: {
                ...this.state.error,
                title: `Your title must be less than ${TITLE_LENGTH} characters.`,
              },
            });
          }
        },
      ],
    };

    if (element) {
      validations[element].forEach((v) => v());
    } else {
      Object.keys(validations).forEach(k => {
        validations[k].forEach((v) => v());
      });
    }
  }

  render() {
    const { error, title } = this.state;
    const placeholder = 'Enter Title (optional).';
    const memo = null;

    return (
      <div className="notes__form">
        <div className="input-group">
          <input
            aria-label="Enter a memo title"
            onChange={this.handleTitleChange}
            placeholder={placeholder}
            ref={(ref) => { this._title = ref; }}
            type="text"
            value={title}
          />
          {
            error && error.title ?
              <Error>{error.title}</Error> :
            null
          }
        </div>
        <MemoInputGroup
          defaultValue={memo}
          onChange={this.handleMemoChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetNavigation: (...args) => dispatch(setNavigation(...args)),
  };
};

export default connect(null, mapDispatchToProps)(MemosForm);
