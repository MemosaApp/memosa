import React, { Component, PropTypes } from 'react';

import CircularLoading from '/imports/theme/loaders/CircularLoading';

import connectNotebooks from '../hocs/Notebooks';
import ListItem from './ListItem';

const { arrayOf, bool, shape } = PropTypes;

class NotebookList extends Component {
  static propTypes = {
    notebooks: arrayOf(shape({

    })),
    notebooksReady: bool,
  }

  render() {
    const { notebooks, notebooksReady } = this.props;

    if (!notebooksReady) {
      return <CircularLoading />;
    }

    return (
      <div className="notebooks-list">
        {notebooks.map(notebook => (
          // XXX Use the notebook's color
          <div className="notebooks-list__item-wrapper">
            <div className="notebooks-list__item">
              <ListItem
                key={notebook._id}
                className="notebooks-list__item-inner"
                notebook={notebook}
              />
            </div>
          </div>
        ))}

        <div className="notebooks-list__item-wrapper notebooks-list__item-wrapper--default">
          <div className="notebooks-list__item">
            <div className="notebooks-list__item-inner">
              +
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { NotebookList };

export default connectNotebooks()(NotebookList);
