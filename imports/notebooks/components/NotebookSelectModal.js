import React, { Component, PropTypes } from 'react';

import CircularLoading from '/imports/app/components/CircularLoading';
import Error from '/imports/app/components/Error';
import NotebookListItem from './NotebookListItem';

const { arrayOf, bool, func, node, shape } = PropTypes;

// XXX
class SelectableList extends Component {
  static propTypes = {
    children: node,
    items: arrayOf(func),
  }

  state = {
    selectedIndex: -1,
  }

  handleSelected = (i) => {
    return (event) => {
      event && event.preventDefault();

      this.setState({
        selectedIndex: i,
      });
    };
  }

  render() {
    const { children, items } = this.props;

    return (
      <div className="selectable-list">
        {items.map((item, i) => {
          return (
            <button
              className="selectable-list__item"
              onClick={this.handleSelected(i)}
              key={i}
            >
              {children(item)}
            </button>
          );
        })}
      </div>
    );
  }
}

class NotebookSelectModal extends Component {
  static propTypes = {
    handleCreateNotebook: func,
    notebooksReady: bool,
    notebooks: arrayOf(shape({
      // XXX
    })),
    onCancel: func,
    onNotebookSelect: func,
  }

  state = {
    error: null,
    selectedNotebook: null,
  }

  handleCreateNotebook = () => {
    const { handleCreateNotebook } = this.props;

    const title = this.notebookTitle.value();

    handleCreateNotebook({
      title,
    }).then((err, value) => {
      // XXX
      debugger;
      return value;
    }).catch(() => {
      // XXX
    });
  }

  handleSelect = () => {

  }

  renderList = () => {
    const { notebooks, notebooksReady } = this.props;

    if (!notebooksReady) {
      return <CircularLoading />;
    }

    return (
      <SelectableList
        items={notebooks}
      >
        {(notebook) => {
          return (
            <NotebookListItem
              notebook={notebook}
            />
          )
        }}
      </SelectableList>
    );
  }

  render() {
    const { error } = this.state;

    return (
      <div className="modal-slide-in-up">
        <div className="modal-backdrop active">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="bar bar-header bar--modal">
                <button>Cancel</button>

                <h2 className="title">Select a Notebook</h2>

                <button>Select</button>
              </div>
              <div className="content has-header overflow-scroll">
                <div className="padding">

                  <div className="notebook-select">
                    <div className="notebook-select__entities">
                      <div className="notebook-select__results">
                        {this.renderList()}
                      </div>
                    </div>

                    <footer className="notebook-select__footer">
                      <form
                        onSubmit={this.handleCreateNotebook}
                      >
                        <div className="input-group">
                          <input
                            id="notebook-select-create"
                            placeholder="Create a new notebook…"
                            ref={(notebookTitle) => { this.notebookTitle = notebookTitle; }}
                            type="text"
                          />
                          <label htmlFor="notebook-select-filter">
                            Create a new notebook
                          </label>
                        </div>
                      </form>
                    </footer>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotebookSelectModal;
