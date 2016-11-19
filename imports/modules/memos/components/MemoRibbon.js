import React, { Component, PropTypes } from 'react';

import MemoAttachModal from './MemoAttachModal';
import Icon from '/imports/Icons';

const { func } = PropTypes;

class MemoRibbon extends Component {
  static propTypes = {

  }

  static contextTypes = {
    ionShowModal: func,
  }

  handleAttach = (event) => {
    const { ionShowModal } = this.context;

    event.preventDefault();

    // XXX open the file modal
    const memoAttachModal = (
      <MemoAttachModal
        onAttachEntity={() => {}}
        onAttachFile={() => {}}
      />
    );
    ionShowModal(memoAttachModal);
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
            <button onClick={this.handleAttach}>
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
      </div>
    );
  }
}

export default MemoRibbon;
