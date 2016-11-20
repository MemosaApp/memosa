import React, { Component, PropTypes } from 'react';

import Modal from '/imports/Modals';
import Icon from '/imports/Icons';
import MemoAttachModal from './MemoAttachModal';

class MemoRibbon extends Component {
  state = {
    showAttach: false,
  }

  handleAttach = (event) => {
    event.preventDefault();

    this.refs.attach.blur();
    this.setState({ showAttach: true });
  }

  handleCloseAttach = (event) => {
    event.preventDefault();

    this.setState({ showAttach: false });
  }

  handleAttachFile = (acceptedFiles, onError) => {
    // TODO

    onError('Something bad happened');
  }

  handleCamera = (event) => {
    event.preventDefault();

    // XXX
  }

  handleTags = (event) => {
    event.preventDefault();

    // XXX
  }

  handleDraw = (event) => {
    event.preventDefault();

    // XXX
  }

  handleSharing = (event) => {
    event.preventDefault();

    // XXX
  }

  handleAudio = (event) => {
    event.preventDefault();

    // XXX
  }

  render() {
    return (
      <div className="memo-ribbon">
        <ul>
          <li>
            <button
              onClick={this.handleAttach}
              ref="attach"
            >
              <Icon
                defaultIcon="ion-android-attach"
                iosIcon="ion-paperclip"
                label="Attach a file"
              />
            </button>
          </li>
          <li>
            <button onClick={this.handleCamera}>
              <Icon
                defaultIcon="ion-android-camera"
                iosIcon="ion-camera"
                label="Take a photo"
              />
            </button>
          </li>
          <li>
            <button onClick={this.handleDraw}>
              <Icon
                defaultIcon="ion-compose"
                label="Add a drawing"
              />
            </button>
          </li>
          <li>
            <button onClick={this.handleAudio}>
              <Icon
                defaultIcon="ion-android-microphone"
                label="Add audio recording"
              />
            </button>
          </li>
          <li>
            <button onClick={this.handleTags}>
              <Icon
                defaultIcon="ion-pricetag"
                label="Manage tags"
              />
            </button>
          </li>

          <li>
            <button onClick={this.handleSharing}>
              <Icon
                defaultIcon="ion-android-people"
                label="Share with others"
              />
            </button>
          </li>

        </ul>

        <Modal
          isOpen={this.state.showAttach}
          onRequestClose={this.handleCloseAttach}
        >
          <MemoAttachModal
            onAttachEntity={() => {}}
            onAttachFile={this.handleAttachFile}
            onClose={this.handleCloseAttach}
          />
        </Modal>
      </div>
    );
  }
}

export default MemoRibbon;
