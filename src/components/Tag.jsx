/*
 * mill - components/Tag.jsx
 *
 * Authors:
 *   xeodou <xeodou@gmail.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import { Link } from 'react-router';

export default class Tag extends React.Component {
  static propTypes = {
    tags: React.PropTypes.array
  };

  static defaultProps = {
    tags: []
  };

  render() {
    const {theme, tags} = this.props;
    return theme(React, {tags, Link});
  }
}
