import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { serverGetRequest, serverDeleteRequest } from '../utils/axios';
import {navigate} from '@reach/router'
import Votes from './Votes'
import Comments from './Comments'
import Delete from './Delete';

export default class SingleArticleLayout extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  }

  state = {
    article: null
  }

  componentDidMount = () => {
    this.fetchSingleArticle()
  }

  fetchSingleArticle = () => {
    const article_id = this.props.article_id
    serverGetRequest('articles/' + article_id)
    .then(({data: {article}}) => {
      this.setState({article})
    })
  }

  handleDelete = () => {
    serverDeleteRequest(this.props.type + 's/' + (this.props.comment_id || this.props.article_id))
    if (this.props.type === 'article') {navigate('/articles/all')}
  }

  render() {
    const { user } = this.props
    const {article: art} = this.state
    return (
      <div className="SingleArticle">
        {art && <ul>
            <li><h2>{art.title}</h2></li>
            <li><h3>Author: {art.author} - Date listed: {art.created_at}</h3></li>
            <br/>
            <li>{art.body}</li>
            <br/>
            <Votes article_id={art.article_id} votes={art.votes}/>
            <br/>
            {art.author === user && <Delete type='article' article_id={art.article_id}/>}
            <br/>
            <li>Comments: {art.comment_count}</li>
            <br/>
            <Comments article_id={art.article_id} user={user} comment_count={art.comment_count}/>
        </ul>}      
      </div>
    )
  }
}
