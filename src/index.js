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
      <article className='post'>
        <header className='post-head'>
          <h1 className='post-title'>
            <Link to={'/post/' + this.props.id}>{this.props.title}</Link>
          </h1>
        </header>
      </article>
    )
  }
};

export default class Index extends React.Component {
  render() {
    return (
      <div className='mill-index'>
        <div className='posts'>
        {this.props.loading ? 'Loading posts' : ''}
        {this.props.posts.map((post, i) => {
          return <ListItem key={post.id} {...post} />;
        })}
        </div>
      </div>
    );
  }
};
