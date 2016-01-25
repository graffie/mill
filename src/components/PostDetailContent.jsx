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
    return (
      <div className="mill-detail-content">
        <div dangerouslySetInnerHTML={{ __html: this.props.post.html }} />
      </div>
    );
  }
}
