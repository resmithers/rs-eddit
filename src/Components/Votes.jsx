import React, { Component } from 'react';
import req from '../utils/axios'

export default class Votes extends Component {

    state = {
        hasVoted: 0
    }

    handleVote = (inc_votes) => {
      const { comment_id, article_id, target } = this.props
      const { hasVoted } = this.state
      const url = `${target}/${comment_id ? comment_id : article_id}`
      hasVoted !== inc_votes && (
        req
        .patch(url, {inc_votes})
        .then(() => this.setState({hasVoted: inc_votes}))
      )
    }

    render() {
      const { votes } = this.props
      const { hasVoted } = this.state
      return (
        <li>Votes: {votes + hasVoted} 
          <button type="button" onClick={() => this.handleVote(1)}>UpVote</button> 
          <button type="button" onClick={() => this.handleVote(-1)}>DownVote</button>
        </li>
      );
    }
}
