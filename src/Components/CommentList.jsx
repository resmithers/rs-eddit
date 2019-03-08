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
      this.props.comment_count > 0 && this.getComments()
    }

    componentDidUpdate(a, pState) {
      const { sort_by, order } = this.state;
      (pState.p !== this.state.p || pState.sort_by !== sort_by || pState.order !== order) && this.getComments()
    }

    getComments = (d = 0) => {
      const { p, sort_by, order } = this.state
      const { article_id:id } = this.props
      req
        .get(`articles/${id}/comments`, {params: { p, sort_by, order }})
        .then(({data: {comments}}) => this.setState(({comment_count}) => ({comments, comment_count: comment_count + d})))
    }

    handleOrder = (e, q) => {
      const {value} = e.target
      this.setState({[q]: value})
    }

    handlePageChange = (dir) => this.setState(({p}) => ({p: p + dir}))

    render() {
      const { comments, comment_count, p, limit } = this.state
      const { user, article_id } = this.props
      return (
        <>
          Comments: {comment_count} 
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
              {comments.map(c => <Comment key={c.comment_id} comment={c} user={user} handleDelete={() => this.getComments(-1)}/>)}
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
