import React, { Component, PropTypes } from 'react';

const { shape, string } = PropTypes;

export default class NotebookListItem extends Component {
  static propTypes = {
    notebook: shape({
      _id: string,
      ownerId: string,
      title: string,
    }).isRequired,
  }

  render() {
    const { notebook } = this.props;

    return (
      <div className="notebook-list-item">
        {notebook.title}
      </div>
    );
  }
}
