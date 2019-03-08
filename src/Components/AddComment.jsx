import React, { Component } from 'react'
import req from '../utils/axios'

export default class AddComment extends Component {
    state = {
      postBody: {}
    }

    handleCommentSubmit = (e) => {
      e.preventDefault()
      const { article_id, user: author } = this.props
      const { postBody } = this.state
      req.post(`articles/${article_id}/comments`, {...postBody, author})
        .then(() => {
          this.props.handleNewComment()
          document.querySelector('form').reset()
          this.setState({postBody: {}})
        })
    }

    handleChange = ({target:t}) => {this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }))}

    render() {
      return (
          <form onSubmit={this.handleCommentSubmit}>
            <input required name='body' type='text' placeholder='Add comment...' onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
          </form>
      )
    }
}
