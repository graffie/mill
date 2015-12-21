/**!
 * mill - src/index.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
import React from 'react';
import { Link } from 'react-router';

class ListItem extends React.Component {
  render() {
    return (
      <div className="mill-list-item">
        <Link to={"/post/" + this.props.id}>{this.props.title}</Link>
      </div>
    )
  }
};

export default class Index extends React.Component {
  render() {
    return (
      <div className="mill-index">
        <h1>{this.props.config.title}</h1>
        <div className="posts-list">
        {this.props.loading ? 'Loading posts' : ''}
        {this.props.posts.map((post, i) => {
          return <ListItem key={post.id} {...post} />;
        })}
        </div>
      </div>
    );
  }
};
