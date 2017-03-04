import React, { Component, PropTypes } from 'react';
import { bind } from 'react-hocs';

import CircularLoading from '/imports/theme/loaders/CircularLoading';

import connectMemos from '../hocs/Memos';

const { arrayOf, bool, shape, string } = PropTypes;

class MemosView extends Component {
  static propTypes = {
    memos: arrayOf(shape({
      _id: string,

    })),
    memosReady: bool,
  }

  render() {
    const { memos, memosReady } = this.props;

    if (!memosReady) {
      return (
        <CircularLoading />
      );
    }

    return (
      <div>
        {
          memos.map(memo => {
            return <div key={memo._id}>Memo</div>;
          })
        }
      </div>
    );
  }
}

export { MemosView };

const mapPropsToData = ({ params }) => {
  return {
    notebookId: params.notebookId,
  };
};

export default bind(
  connectMemos(mapPropsToData),
)(MemosView);
