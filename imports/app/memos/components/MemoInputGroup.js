import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import classnames from 'classnames';

import MemoRibbon from './MemoRibbon';

const { func, object } = PropTypes;

const parseMemo = (s = null) => {
  if (s === null) {
    return ContentState.createFromText('');
  } else {
    return ContentState.createFromBlockArray(convertFromRaw(JSON.parse(s)));
  }
};

const objectifyMemo = (editorState) => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

export default class MemoInputGroup extends Component {
  static propTypes = {
    defaultValue: object,
    onChange: func,
  }

  static props = {
    defaultValue: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(parseMemo(props.defaultValue)),
    };
  }

  focus = () => {
    this.editor.focus();
  }

  handleChange = (editorState) => {
    const { onChange } = this.props;

    // TODO scroll to bottom if the height of the container changes
    // I think we need to bubble up that the cursor is at the end too

    this.setState({
      editorState,
    });

    if (onChange) {
      onChange({
        jsonContent: objectifyMemo(editorState),
        // TODO This probably won't work with images
        isEmpty: !editorState.getCurrentContent().hasText(),
      });
    }
  }

  render() {
    const { editorState } = this.state;

    const className = classnames(
      'input-group',
      'memo-input-group',
      {
        'memo-input-group--hide-placeholder': editorState.getCurrentContent().hasText(),
      }
    );

    return (
      <div className={className}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          placeholder="Just start typing…"
          spellCheck
          ref={(editor) => { this.editor = editor; }}
        />
        <MemoRibbon />
      </div>
    );
  }
}
