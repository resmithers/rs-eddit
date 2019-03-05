/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';

export default class LiArticle extends Component {
    state = {
        art: null,
        hasVoted: {}
    }

    render() {
        const art = this.state.art || this.props.art
        return (
          <ul key={art.article_id} className="LiArticle">
            <li><Link to={`/articles/${art.article_id}`}>{art.title}</Link></li>
            <li>Author: {art.author}</li>
            <li>Date listed: {art.created_at}</li>
            <li>Comments: {art.comment_count}</li>
            <Votes article_id={art.article_id} votes={art.votes}/>
          </ul>
        );    
    }
}