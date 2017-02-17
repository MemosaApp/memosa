import React, { Component, PropTypes } from 'react';

import { Modal } from 'reactionic-modal';
import Icon from 'reactionic-icons';
import connectEntities from '/imports/app/entities/hocs/Entities';
import MemoAttachModal from './MemoAttachModal';

const { func } = PropTypes;

class MemoRibbon extends Component {
  static propTypes = {
    handleUpload: func,
  }

  state = {
    showAttach: false,
  }

  handleAttach = (event) => {
    event.preventDefault();

    this._attach.blur();
    this.setState({ showAttach: true });
  }

  handleCloseAttach = (event) => {
    event.preventDefault();

    this.setState({ showAttach: false });
  }

  handleAttachEntity = (/* entityId */) => {
    // TODO add the entity to the memo
  }

  handleCamera = (event) => {
    event.preventDefault();

    // TODO
  }

  handleTags = (event) => {
    event.preventDefault();

    // TODO
  }

  handleDraw = (event) => {
    event.preventDefault();

    // TODO
  }

  handleSharing = (event) => {
    event.preventDefault();

    // TODO
  }

  handleAudio = (event) => {
    event.preventDefault();

    // TODO
  }

  render() {
    const { handleUpload } = this.props;

    return (
      <div className="memo-ribbon">
        <ul>
          <li>
            <button
              onClick={this.handleAttach}
              ref={(ref) => { this._attach = ref; }}
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
            onAttachEntity={this.handleAttachEntity}
            onClose={this.handleCloseAttach}
            onUpload={handleUpload}
          />
        </Modal>
      </div>
    );
  }
}

export { MemoRibbon };

export default connectEntities()(MemoRibbon);
