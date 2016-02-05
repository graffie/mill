/*
 * mill - src/detail.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import PostDetailContent from './components/PostDetailContent';

export default class Detail extends React.Component {

  static propTypes = {
    params: React.PropTypes.object,
    posts: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    const post = this.fetchPost(props.params.id, props.posts);
    this.state = { post };
    document.title = post.title || '';
  }

  componentWillReceiveProps(nextProps) {
    const post = this.fetchPost(nextProps.params.id, nextProps.posts);
    this.setState({ post });
    document.title = post.title || '';
  }

  fetchPost(postId, posts) {
    let post = {};
    for (const item of posts) {
      if (String(item.id) === postId) {
        post = item;
      }
    }
    return post;
  }

  render() {
    return (
      <div className="mill-detail">
        <h1 className='post-title'>{this.state.post.title}</h1>
        <PostDetailContent post={this.state.post} />
      </div>
    );
  }
}
