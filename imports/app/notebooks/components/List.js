import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';

import CircularLoading from '/imports/theme/loaders/CircularLoading';
import { MEMOS_ROUTE } from '/imports/app/memos/constants';

import { NOTEBOOKS_ROUTE } from '../constants';
import connectNotebooks from '../hocs/Notebooks';
import ListItemGraphic from './ListItemGraphic';

const { arrayOf, bool, func, shape } = PropTypes;

class NotebookList extends Component {
  static propTypes = {
    handlePush: func.isRequired,
    notebooks: arrayOf(shape({

    })),
    notebooksReady: bool,
  }

  handleClick = (notebookId) => {
    return (event) => {
      event && event.preventDefault();

      const { handlePush } = this.props;

      handlePush(`${NOTEBOOKS_ROUTE}/${notebookId}/${MEMOS_ROUTE}`);
    };
  }

  render() {
    const { notebooks, notebooksReady } = this.props;

    if (!notebooksReady) {
      return <CircularLoading />;
    }

    return (
      <div className="notebooks-list">
        {notebooks.map(notebook => (
          <ListItemGraphic
            key={notebook._id}
            notebook={notebook}
            onClick={this.handleClick(notebook._id)}
          />
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

const mapDispatchToProps = (dispatch) => {
  return {
    handlePush: (...args) => dispatch(push(...args)),
  };
};

export default bind(
  connect(null, mapDispatchToProps),
  connectNotebooks()
)(NotebookList);
