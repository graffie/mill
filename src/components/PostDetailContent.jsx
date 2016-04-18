/*
 * mill - components/PostDetailContent.jsx
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import { Link } from 'react-router';
import ShareButton from './ShareButton';
import Tag from './Tag';
import inject from '../inject';

export default class Detail extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {theme, post} = this.props;
    const user = post.user || {};
    return theme.articleDetail(React, {
      url: window.location.href,
      user,
      post,
      Link,
      Tag: inject(Tag, theme.tag),
      ShareButton: inject(ShareButton, theme.shareButton)
    })
  }
}
