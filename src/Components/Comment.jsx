import React, { Component } from 'react';
import moment from 'moment';
import Votes from './Votes';
import Delete from './Delete';

export default class Comment extends Component {
    state = {
        deleted: false
    }

    onDelete = () => {
        this.setState({deleted: true})
        this.props.handleDelete()
    }

    render() {
      const { comment: { comment_id, author, created_at, body, votes }, user } = this.props;
      return (
          <>
          {!this.state.deleted && (
            <li key={comment_id} className="liComment">
              <ul>
                <li>{author} - {moment(created_at).format('D MMM YY')} <br /> {body}</li>
                <br />
                <Votes comment_id={comment_id} votes={votes} target="comments" />
                <br />
                {author === user && <Delete type='comment' comment_id={comment_id} onDelete={this.onDelete}/>}
              </ul>
            </li>)}
          </>
      );
    }
}
