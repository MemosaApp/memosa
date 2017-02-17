import React, { Component, PropTypes } from 'react';

import ListItem from './ListItem';

const { func, node, number, shape } = PropTypes;

export default class ListItemGraphic extends Component {
  static propTypes = {
    children: node,
    notebook: shape({
      color: shape({
        hue: number, // 0 - 360
        saturation: number, // 0 - 100
        lightness: number, // 0 - 100
      }),
    }),
    onClick: func,
  }

  static defaultProps = {
    onClick: () => {},
  }

  renderNotebook = () => {
    const { notebook, onClick } = this.props;
    const { color } = notebook;

    let overrideColor = null;
    let overrideDarkColor = null;

    if (color) {
      const { hue, saturation, lightness } = color;
      overrideColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      overrideDarkColor = `hsl(${hue}, ${saturation}%, ${Math.max(lightness - 15, 0)}%)`;
    }

    return (
      <button
        className="notebook-list-item-graphic__wrapper"
        onClick={onClick}
      >
        <div
          className="notebook-list-item-graphic"
          style={{ 'background-color': overrideColor }}
        >
          <ListItem
            className="notebook-list-item-graphic__inner"
            notebook={notebook}
          />
          <div
            className="notebook-list-item-graphic__decoration"
            style={{ 'border-color': overrideDarkColor }}
          />
        </div>
      </button>
    );
  }

  renderDefault = () => {
    const { children, onClick } = this.props;

    return (
      <button
        className="notebook-list-item-graphic__wrapper notebook-list-item-graphic__wrapper--default"
        onClick={onClick}
      >
        <div className="notebook-list-item-graphic">
          <div className="notebook-list-item-graphic__inner">
            {children}
          </div>
          <div className="notebook-list-item-graphic__decoration" />
        </div>
      </button>
    );
  }

  render() {
    const { notebook } = this.props;

    if (notebook) {
      return this.renderNotebook();
    } else {
      return this.renderDefault();
    }
  }
}
