import React, { Component } from 'react';
import req from '../utils/axios'
import {navigate} from '@reach/router'

export default class Delete extends Component {
    handleDelete = () => {
      const { type, comment_id, article_id, onDelete} = this.props
      req
        .delete(`${type}s/${comment_id || article_id}`)
        .then(() => {
          comment_id && onDelete()
          article_id && navigate('/articles/all')
        })
  }

    render() {
      const { type, comment_id } = this.props
      return (<button onClick={this.handleDelete}>Delete {type} {comment_id}</button>);
    }
}
