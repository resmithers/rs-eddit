import React, { Component } from 'react';
import {serverGetRequest} from '../utils/axios'
import Votes from './Votes'
import Delete from './Delete';

export default class Comments extends Component {

    state = {
        comments: []
    }

    componentDidMount() {
        serverGetRequest('articles/' + this.props.article_id + '/comments')
        .then(({data: {comments}}) => this.setState({comments}))
    }

    componentDidUpdate() {
      serverGetRequest('articles/' + this.props.article_id + '/comments')
        .then(({data: {comments}}) => this.setState({comments}))
    }

    render() {
      return (
        <ul>
          {this.state.comments.map(comment => (
            <li key={comment.comment_id} className='liComment'>
                <ul>
                    <li>{comment.author} ({comment.created_at}) : {comment.body}</li>
                    <br/>
                    <Votes comment_id={comment.comment_id} votes={comment.votes}/>
                    <br/>
                    <Delete type='comment' comment_id={comment.comment_id}/>
                </ul>
            </li>
            ))}
        </ul>
      );
    }
}
