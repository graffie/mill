/*
 * mill - src/index.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import IndexListItem from './components/IndexListItem';

export default class Index extends React.Component {

  static propTypes = {
    config: React.PropTypes.object,
    loading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    posts: React.PropTypes.array,
  };

  static defaultProps = {
    loading: true,
    error: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = this.props.config.title || 'Mill';
  }

  render() {
    return (
      <div className="mill-index">
        <div className="posts">
        {this.props.loading ? 'Loading posts' : ''}
        {this.props.error ? 'Error occurred' : ''}
        {this.props.posts.map(post => {
          return <IndexListItem key={post.id} {...post} />;
        })}
        </div>
      </div>
    );
  }
}
