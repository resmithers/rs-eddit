import React, { Component } from 'react';
import AddComment from './AddComment';
import req from '../utils/axios'
import Comment from './Comment';

export default class CommentList extends Component {

    state = {
        comments: [],
        p: 1,
        limit: 10,
        comment_count: +this.props.comment_count,
        sort_by: 'created_at',
        order: 'desc'
    }

    componentDidMount() {
      if (this.props.comment_count > 0) this.getComments()
    }

    componentDidUpdate(z, pState) {
      const { sort_by, order, p } = this.state;

      const a = pState.p !== p;
      const b = pState.sort_by !== sort_by;
      const c = pState.order !== order;

      if (a || b || c) this.getComments()
    }

    getComments = (d = 0) => {
      const { p, limit, sort_by, order } = this.state
      const { article_id:id } = this.props
      req
        .get(`articles/${id}/comments`, {params: { p, sort_by, order, limit }})
        .then(({data: {comments}}) => this.setState(({comment_count}) => ({comments, comment_count: comment_count + d})))
    }

    handleOrder = (e, str) => {
      const {value} = e.target
      this.setState({[str]: value})
    }

    handlePageChange = (dir) => this.setState(({p}) => ({p: p + dir}))

    render() {
      const { comments, comment_count, p, limit } = this.state
      const { user, article_id } = this.props
      return (
        <>
          <AddComment user={user} article_id={article_id} handleNewComment={() => this.getComments(1)}/>
          <form>
            Sort by: 
              <select onChange={(e) => this.handleOrder(e, 'sort_by')}>
                <option default value='created_at'>Date</option>
                <option value='votes'>Votes</option>
              </select>
            Order: 
            <select onChange={(e) => this.handleOrder(e, 'order')}>
              <option default value='desc'>desc</option>
              <option value='asc'>asc</option>
            </select>
          </form>
          {comment_count > 0 && (
            <>
              {comments.map(c => <Comment key={c.comment_id} comment={c} user={user}/>)}
              <div>
                <button disabled={p <= 1} onClick={() => this.handlePageChange(-1)}>previous</button>
                <button disabled={p >= Math.ceil(comment_count / limit)} onClick={() => this.handlePageChange(1)}>next</button>
              </div>
            </>
          )}
        </>
      );
    }
}
