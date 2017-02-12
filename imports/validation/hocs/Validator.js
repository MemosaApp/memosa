import React, { Component, PropTypes } from 'react';
import { connectFactory } from 'react-hocs';

const { node } = PropTypes;

export default connectFactory(class Validator extends Component {
  static propTypes = {
    children: node,
  }

  /**
   * Given a key-value pair of values and a
   * key-value pair of rules, match any validations
   * to their value and return a set of failed
   * validations.
   */
  validate = (values, rules) => {
    // For each value, see if there is a rule.
    // Return all errors that fail
    const validationSet = {
      isSuccess: true,
      validations: {},
    };

    Object.keys(values).forEach(key => {
      const value = values[key];

      if (rules[key]) {
        const rule = rules[key];

        const validation = rule(value);
        validationSet.isSuccess = validationSet.isSuccess && validation === true;
        validationSet.validations[key] = validation;
      }
    });

    return validationSet;
  }

  render() {
    const { children, ...rest } = this.props;

    return React.cloneElement(children, {
      ...rest,
      validate: this.validate,
    });
  }
});
