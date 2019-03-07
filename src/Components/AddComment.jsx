import React, { Component } from 'react'
import {serverPostRequest} from '../utils/axios'

export default class AddComment extends Component {
    state = {}

    handleCommentSubmit = (e) => {
      e.preventDefault()
      e.target.value = null
      const { article_id, user: author } = this.props
      serverPostRequest(`articles/${article_id}/comments`, {...this.state.postBody, author})
      .then(() => {
        this.props.handleNewComment()
        document.querySelector('form').reset()
      })
    }

    handleChange = (e) => {
      const t = e.target;
      this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }));
    }

    render() {
      return (
          <form onSubmit={this.handleCommentSubmit}>
            <input name='body' type='text' placeholder='Add comment...' onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
          </form>
      )
    }
}
