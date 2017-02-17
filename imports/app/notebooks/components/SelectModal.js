import React, { Component, PropTypes } from 'react';

import SelectableList from '/imports/theme/forms/SelectableList';
import CircularLoading from '/imports/theme/loaders/CircularLoading';
import Error from '/imports/theme/errors/Error';
import ListItem from './ListItem';
import connectNotebooks from '../hocs/Notebooks';

const { arrayOf, bool, func, shape, string } = PropTypes;

class NotebookSelectModal extends Component {
  static propTypes = {
    defaultValue: string,
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

  componentWillMount() {
    this.setState({
      selectedNotebook: this.props.defaultValue,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;

    if (defaultValue !== this.state.selectedNotebook) {
      this.setState({
        selectedNotebook: defaultValue,
      });
    }
  }

  handleCreateNotebook = (event) => {
    event && event.preventDefault();

    const { handleCreateNotebook } = this.props;

    const title = this.notebookTitle.value;

    this.notebookTitle.value = '';

    handleCreateNotebook({
      title,
    });

    // TODO auto-select the created notebook
  }

  handleChangeSelected = (id) => {
    this.setState({
      selectedNotebook: id,
    });
  }

  handleSelect = (event) => {
    event.preventDefault();
    this.props.onNotebookSelect(this.state.selectedNotebook);
  }

  renderList = () => {
    const { defaultValue, notebooks, notebooksReady } = this.props;

    if (!notebooksReady) {
      return <CircularLoading />;
    }

    return (
      <SelectableList
        defaultValue={defaultValue}
        items={notebooks.map(notebook => ({ ...notebook, key: notebook._id }))}
        onSelect={this.handleChangeSelected}
      >
        {(notebook) => {
          return (
            <ListItem
              notebook={notebook}
            />
          );
        }}
      </SelectableList>
    );
  }

  render() {
    const { onCancel } = this.props;
    const { error, selectedNotebook } = this.state;

    const isNotebookSelected = Boolean(selectedNotebook);

    return (
      <div className="modal-slide-in-up">
        <div className="modal-backdrop active">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="bar bar-header bar--modal">
                <button onClick={onCancel}>Cancel</button>

                <h2 className="title">Select a Notebook</h2>

                {
                  isNotebookSelected ?
                    <button onClick={this.handleSelect}>Select</button> :
                    null
                }
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
                            aria-label="Create a new notebook"
                            id="notebook-select-create"
                            placeholder="Create a new notebook…"
                            ref={(notebookTitle) => { this.notebookTitle = notebookTitle; }}
                            type="text"
                          />
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

export { NotebookSelectModal };

export default connectNotebooks()(NotebookSelectModal);
