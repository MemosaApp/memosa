import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const { arrayOf, func, shape, string } = PropTypes;

/**
 * This component provides a reuseable way to create
 * a selectable list. Feed in the items with a key,
 * and use the children as a function. Foreach item,
 * the children callback will be called to render
 * the item.
 *
 * TODO make this use a radio list under the hood
 * for accessibility
 */
export default class SelectableList extends Component {
  static propTypes = {
    children: func,
    defaultValue: string,
    items: arrayOf(shape({
      key: string,
    })),
    onSelect: func,
  }

  state = {
    selectedKey: null,
  }

  componentWillMount() {
    this.setState({
      selectedKey: this.props.defaultValue,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;

    if (defaultValue !== this.state.selectedKey) {
      this.setState({
        selectedKey: defaultValue,
      });
    }
  }

  handleSelected = (i) => {
    return (event) => {
      event && event.preventDefault();
      const { selectedKey } = this.state;
      const { onSelect } = this.props;

      // Don't re-render if we don't need to.
      // Otherwise, changing state forces the
      // component to re-render and re-evaluate
      // all children function calls
      if (i !== selectedKey) {
        this.setState({
          selectedKey: i,
        });

        if (onSelect) {
          onSelect(i);
        }
      }
    };
  }

  render() {
    const { children, items } = this.props;
    const { selectedKey } = this.state;

    return (
      <div className="selectable-list">
        {items.map((item) => {
          const className = classnames(
            'selectable-list__item',
            {
              'selectable-list__item--selected': item.key === selectedKey,
            },
          );

          return (
            <button
              className={className}
              onClick={this.handleSelected(item.key)}
              key={item.key}
            >
              {children(item)}
            </button>
          );
        })}
      </div>
    );
  }
}
