import React, { Component } from 'react';
import {serverGetRequest} from '../utils/axios'
import Votes from './Votes'

export default class Comments extends Component {

    state = {
        comments: []
    }

    componentDidMount() {
        serverGetRequest('articles/' + this.props.article_id + '/comments')
        .then(({data: {comments}}) => this.setState({comments}))
    }

    render() {
      return (
        <ul>
          {this.state.comments.map(comment => (
            <li key={comment.comment_id} className='liComment'>
                <ul>
                    <li>{comment.author} - {comment.body}</li>
                    <br/>
                    <Votes comment_id={comment.comment_id} votes={comment.votes}/>
                    <br/>
                </ul>
            </li>
            ))}
        </ul>
      );
    }
}
