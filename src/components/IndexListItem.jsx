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
    const createdAt = this.props.createdAt;
    return (
      <article className='post'>
        <header className='post-head'>
          <h1 className='post-title'>
            <Link to={`/post/${this.props.id}`}>{this.props.title}</Link>
          </h1>
        </header>
        <div className='post-preview'>
          <aside className='col-aside'>
            <span className='post-meta'>
              <i className='fa fa-calendar'></i>
              <time className='post-item-time' dateTime={createdAt.toJSON()}>{createdAt.toDateString()}</time>
            </span>
          </aside>
          <section className='post-excerpt'>
            <p>{strip(this.props.html)}</p>
            <Link className='btn' to={`/post/${this.props.id}`}>Read More</Link>
          </section>
        </div>
      </article>
    );
  }
}

function strip(html) {
   const tmp = document.createElement('DIV');
   tmp.innerHTML = html;
   return (tmp.textContent || tmp.innerText || '').replace(/\r?\n|\r/g, ' ');
}
