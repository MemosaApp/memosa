import React, { Component, PropTypes } from 'react';
import { IonModal } from 'reactionic';

const { func } = PropTypes;

class MemoAttachModal extends Component {
  static propTypes = {
    onAttachEntity: func,
    onAttachFile: func,
  }

  render() {
    return (
      <IonModal
        barClasses="bar--modal"
        customClasses=""
        customTemplate={false}
        title="Attach a file"
      >
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
            <button>Upload a file…</button>
          </footer>
        </div>
      </IonModal>
    );
  }
}

export default MemoAttachModal;
