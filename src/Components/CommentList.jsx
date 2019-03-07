import React, { Component } from 'react';
import AddComment from './AddComment';
import req from '../utils/axios'
import Comment from './Comment';

export default class CommentList extends Component {

    state = {
        comments: [],
        p: 1,
        limit: 10,
        comment_count: +this.props.comment_count
    }

    componentDidMount() {
      this.props.comment_count > 0 && this.getComments()
    }

    componentDidUpdate(a, pState) {
      pState.p !== this.state.p && this.getComments()
    }

    getComments = (d = 0) => {
      const { p } = this.state
      const { article_id:id } = this.props
      req
        .get(`articles/${id}/comments`, {params: { p }})
        .then(({data: {comments}}) => this.setState(({comment_count}) => ({comments, comment_count: comment_count + d})))
    }

    handlePageChange = (dir) => this.setState(({p}) => ({p: p + dir}))

    render() {
      const { comments, comment_count, p, limit } = this.state
      const { user, article_id } = this.props
      return (
        <>
          Comments: {comment_count} 
          <AddComment user={user} article_id={article_id} handleNewComment={() => this.getComments(1)}/>
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
