/*
 * mill - components/IndexListItem.jsx
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import { Link } from 'react-router';
import Tag from './Tag';
import inject from '../inject';

export default class ListItem extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    title: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const createdAt = this.props.createdAt;
    const { theme } = this.props;
    const post = {
      id: this.props.id,
      title: this.props.title,
      sumary: strip(this.props.html),
      tags: this.props.tags,
      createdAt
    }
    return theme.articleListItem(React, { post, Tag: inject(Tag, theme.tag), Link });
  }
}

function strip(html) {
   const tmp = document.createElement('DIV');
   tmp.innerHTML = html;
   return (tmp.textContent || tmp.innerText || '').replace(/\r?\n|\r/g, ' ');
}
