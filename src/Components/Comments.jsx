import React, { Component } from 'react';
import {serverGetRequest, serverDeleteRequest} from '../utils/axios'
import Votes from './Votes'
import AddComment from './AddComment';

export default class Comments extends Component {

    state = {
        comments: [],
        p: 1,
        limit: 10
    }

    componentDidMount() {
        serverGetRequest('articles/' + this.props.article_id + '/comments')
        .then(({data: {comments}}) => this.setState({comments}))
    }

    componentDidUpdate(pProp, pState) {
      const p = this.state.p
      if (pState.p !== p) {
        serverGetRequest('articles/' + this.props.article_id + '/comments', {params: { p:p }})
        .then(({data: {comments}}) => {
          this.setState({comments})
        })
    }
    }

    handleDelete = (id) => {
      serverDeleteRequest('comments/' + id)
      .then(() => {
        serverGetRequest('articles/' + this.props.article_id + '/comments')
        .then(({data: {comments}}) => this.setState({comments}))
      })
    }

    handleNewComment = () => {
      console.log('handler')
      serverGetRequest('articles/' + this.props.article_id + '/comments')
        .then(({data: {comments}}) => {
          console.log(comments)
          this.setState({comments})
        })
    }

    handlePageChange = (dir) => {
      this.setState(({p}) => ({p: p + dir}))
    }

    render() {
      return (
        <ul>
          <li/>
            <AddComment user={this.props.user} article_id={this.props.article_id} handleNewComment={this.handleNewComment}/>
          <li/>
          {this.state.comments.map(comment => (
            <li key={comment.comment_id} className='liComment'>
                <ul>
                    <li>{comment.author} ({comment.created_at}) : {comment.body}</li>
                    <br/>
                    <Votes comment_id={comment.comment_id} votes={comment.votes}/>
                    <br/>
                    {comment.author === this.props.user && <button onClick={() => this.handleDelete(comment.comment_id)}>Delete</button>}
                </ul>
            </li>
            ))}
            <button disabled={this.state.p <= 1} onClick={() => this.handlePageChange(-1)}>previous</button>
            <button disabled={this.state.p >= Math.ceil(this.props.comment_count / this.state.limit)} onClick={() => this.handlePageChange(1)}>next</button>
        </ul>
      );
    }
}
