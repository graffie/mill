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
    const tags = this.props.tags.map((t, i)=> {
      const comma = i !== this.props.tags.length - 1 ? <span>, </span> : '';
      return <Link key={i} to='/' query={{tag: t}}>{t}{comma}</Link>;
    });

    return (
      <p className='post-item-tags'>
        <i className='fa fa-tags'></i>
        {tags}
      </p>
    );
  }
}
