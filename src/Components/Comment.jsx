import React, { Component } from 'react';
import moment from 'moment';
import Votes from './Votes';
import Delete from './Delete';
import { Card } from 'react-bootstrap';

export default class Comment extends Component {
    state = {
        deleted: false
    }

    onDelete = () => {
        this.setState({deleted: true})
    }

    render() {
      const { comment: { comment_id, author, created_at, body, votes }, user } = this.props;
      return (
          <>
            {!this.state.deleted &&
              <Card>
                <Card.Header>{author}</Card.Header>
                <br />
                <Card.Body>
                  {body}
                  <br/>
                  Date listed: {moment(created_at).format('D MMM YY')}
                </Card.Body>
                <Votes comment_id={comment_id} votes={votes} target="comments" />
                <br/>
                {author === user && <Delete type='comment' comment_id={comment_id} onDelete={this.onDelete}/>}
              </Card>
            }
          </>
      );
    }
}
