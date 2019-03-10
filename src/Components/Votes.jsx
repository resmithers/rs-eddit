import React, { Component } from 'react';
import req from '../utils/axios'
import { ButtonToolbar, Button } from 'react-bootstrap'


export default class Votes extends Component {

    state = {
        modVote: 0
    }

    handleVote = (inc_votes) => {
      const { comment_id, article_id, target } = this.props
      const url = `${target}/${comment_id ? comment_id : article_id}`

      req
        .patch(url, {inc_votes})
        .then(() => this.setState(({modVote}) => ({modVote: modVote + inc_votes})))
    }

    render() {
      const { votes } = this.props
      const { modVote } = this.state
      return (
          <ButtonToolbar>
            <Button disabled={modVote > 0} variant="outline-success" size="sm" onClick={() => this.handleVote(1)}>&#x2B06;</Button>
            Votes: {votes + modVote}
            <Button disabled={modVote < 0}variant="outline-danger" size="sm" onClick={() => this.handleVote(-1)}>&#x2B07;</Button>
          </ButtonToolbar>
      );
    }
}
