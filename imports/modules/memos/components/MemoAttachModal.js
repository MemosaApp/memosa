import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import Error from '/imports/modules/app/components/Error';

const { func } = PropTypes;

class MemoAttachModal extends Component {
  static propTypes = {
    onAttachEntity: func,
    onAttachFile: func,
    onClose: func,
  }

  state = {
    error: null,
    processing: false,
  }

  handleDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles !== null && rejectedFiles.length > 0) {
      this.setState({
        error: {
          files: 'Some of your files could not be uploaded!',
        }
      });
      return;
    }

    this.setState({
      error: null,
      processing: true,
    });

    this.props.onAttachFile(acceptedFiles, this.handleError.bind(this));
  }

  handleError = (message) => {
    this.setState({
      error: {
        files: message,
      }
    });
  }

  render() {
    const { error, processing } = this.state;
    const { onClose } = this.props;

    return (
      <div className="modal-slide-in-up">
        <div className="modal-backdrop active">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="bar bar-header bar--modal">
                <h2 className="title" id="a11y-155">Attach a file</h2>
                <button className="button button-icon" onClick={onClose}>
                  <i className="icon ion-ios-close-empty"></i>
                </button>
              </div>
              <div className="content has-header overflow-scroll">
                <div className="padding">

                  <div className="memo-attach">
                    <div className="memo-attach__entities">
                      <div className="input-group">
                        <input
                          id="memo-attach-filter"
                          placeholder="Filter…"
                          type="text"
                        />
                        <label htmlFor="memo-attach-filter">
                          Add a file you have perviously uploaded
                        </label>
                      </div>

                      <div className="memo-attach__filter-results">
                        TODO Results go here
                      </div>
                    </div>

                    <footer className="memo-attach__footer">
                      <p>or</p>

                      <div className="memo-attach__file">
                        {
                          error && error.files ?
                          <Error>{error.files}</Error> :
                          null
                        }
                        {
                          processing ?
                          <button
                            className="button button-primary button-disabled"
                            disabled
                          >
                            Uploading…
                          </button> :
                          <Dropzone
                            className="memo-attach__dropzone button button-primary"
                            disablePreview
                            onDrop={this.handleDrop}
                          >
                            <div>Upload a file…</div>
                          </Dropzone>
                        }

                      </div>
                    </footer>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemoAttachModal;
