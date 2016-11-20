import React, { Component, PropTypes } from 'react';
import { IonModal } from 'reactionic';
import Dropzone from 'react-dropzone';

const { func } = PropTypes;

class MemoAttachModal extends Component {
  static propTypes = {
    onAttachEntity: func,
    onAttachFile: func,
    onClose: func,
  }

  handleDrop = (acceptedFile, rejectedFiles) => {
    // TODO
  }

  render() {
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
                        <label htmlFor="memo-attach-filter">
                          Add a file you have perviously uploaded
                        </label>
                        <input
                          id="memo-attach-filter"
                          placeholder="Filter…"
                          type="text"
                        />
                      </div>

                      <div className="memo-attach__filter-results">
                        TODO Results go here
                      </div>
                    </div>

                    <footer className="memo-attach__footer">
                      <p>or</p>

                      <div className="memo-attach__file">
                        <Dropzone
                          onDrop={this.handleDrop}
                        />
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
