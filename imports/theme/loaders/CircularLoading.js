import React, { Component } from 'react';

export default class CircularLoading extends Component {
  render() {
    return (
      <div className="circular-loading">
        <div className="circular-loading__figure" />
        <p className="circular-loading__label">Loading</p>
      </div>
    );
  }
}
