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

export default class ListItem extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    title: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="post">
        <header className="post-head">
          <h1 className="post-title">
            <Link to={`/post/${this.props.id}`}>{this.props.title}</Link>
          </h1>
        </header>
      </article>
    );
  }
}
