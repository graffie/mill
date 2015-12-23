/**!
 * mill - src/detail.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
import React from 'react';

export default class Detail extends React.Component {

  constructor(props) {
    super(props);

    let post = this.fetchPost(props.params.id, props.posts);
    this.state = {
      post: post
    };
  }

  fetchPost(postId, posts) {
    let post = {};
    for (let item of posts) {
      if (String(item.id) === postId) {
        post = item;
      }
    }
    return post;
  }

  componentWillReceiveProps(nextProps) {
    let post = this.fetchPost(nextProps.params.id, nextProps.posts);
    this.setState({post: post});
  }

  render() {
    return (
      <div className='mill-detail'>
        <h1>{this.state.post.title}</h1>
        <div className='mill-detail-content'>
          <div dangerouslySetInnerHTML={{__html: this.state.post.html}} />
        </div>
      </div>
    );
  }
};
