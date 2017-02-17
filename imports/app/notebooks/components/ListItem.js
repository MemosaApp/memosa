import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

const { shape, string } = PropTypes;

export default class NotebookListItem extends Component {
  static propTypes = {
    className: string,
    notebook: shape({
      _id: string,
      ownerId: string,
      title: string,
    }).isRequired,
  }

  render() {
    const { className, notebook } = this.props;

    const classname = classnames(
      className,
      'notebook-list-item'
    );

    return (
      <div className={classname}>
        <div className="notebook-list-item__title">
          {notebook.title}
        </div>
        <div className="notebook-list-item__created">
          {moment(notebook.created).format('D MMM YYYY')}
        </div>
      </div>
    );
  }
}
