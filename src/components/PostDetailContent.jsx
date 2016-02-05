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

export default class Detail extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const createdAt = this.props.post.createdAt;
    return (
      <div className="mill-detail-content">
        <section className="post-meta">
          <span className="post-time">
            <i className="fa fa-calendar"></i>
            <time dateTime="{createdAt ? createdAt.toJSON() : ''}" className="fulldate">{createdAt ? createdAt.toDateString() : ''}</time>
          </span>
        </section>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.html }} />
      </div>
    );
  }
}
