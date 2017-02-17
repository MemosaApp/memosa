import React, { Component, PropTypes } from 'react';

import CircularLoading from '/imports/theme/loaders/CircularLoading';

import connectNotebooks from '../hocs/Notebooks';
import ListItemGraphic from './ListItemGraphic';

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
          <ListItemGraphic key={notebook._id} notebook={notebook} />
        ))}

        {/* Default List Item Graphic */}
        <ListItemGraphic>
          +
        </ListItemGraphic>
      </div>
    );
  }
}

export { NotebookList };

export default connectNotebooks()(NotebookList);
