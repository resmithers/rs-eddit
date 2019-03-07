import React, { Component } from 'react';
import {serverPatchRequest} from '../utils/axios'

export default class Votes extends Component {

    state = {
        hasVoted: 0
    }

    handleVote = (inc_votes) => {
        const id = (this.props.comment_id && 'comments/' + this.props.comment_id) || ('articles/' + this.props.article_id)
        if (this.state.hasVoted !== inc_votes) serverPatchRequest(id, inc_votes).then(() => this.setState({hasVoted: inc_votes}))
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
