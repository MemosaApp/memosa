import React, { Component, PropTypes } from 'react';

const { bool, node, number } = PropTypes;

/**
 * Fade in the content when mounted
 */
export default class FadeIn extends Component {
  static propTypes = {
    children: node,
    disableAnimation: bool,
    duration: number,
  }

  static defaultProps = {
    disableAnimation: false,
    duration: 1000,
  }

  state = {
    opacity: 0,
  }

  componentWillMount() {
    this.setState({
      opacity: this.props.disableAnimation ? 1.0 : 0,
    });
  }

  componentDidMount() {
    if (!this.props.disableAnimation) {
      window.requestAnimationFrame(this.step);
    }
  }

  step = (timestamp) => {
    if (!this.start) {
      this.start = timestamp;
    }
    const progress = timestamp - this.start;

    this.setState({
      opacity: Math.min(1.0, progress / this.props.duration),
    });

    if (progress <= this.props.duration) {
      window.requestAnimationFrame(this.step);
    }
  }

  render() {
    const { children } = this.props;
    const { opacity } = this.state;

    return React.cloneElement(children, {
      style: {
        opacity,
      },
    });
  }
}
