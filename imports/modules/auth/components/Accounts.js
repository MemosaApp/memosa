import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class Accounts extends Component {
  componentDidMount() {
    this.view = Blaze.render(
      Template.loginButtons,
      this.container
    );
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  setRef = (name) => {
    return (node) => {
      this[name] = node;
    }
  }

  render() {
    return <span ref={this.setRef('container')} />;
  }
}
