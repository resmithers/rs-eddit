import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { serverGetRequest, serverDeleteRequest } from '../utils/axios';
import {navigate} from '@reach/router'
import Votes from './Votes'
import CommentList from './CommentList'
import Delete from './Delete';
import moment from 'moment'

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
    const { article_id } = this.props
    serverGetRequest(`articles/${article_id}`)
      .then(({data: {article}}) => this.setState({article}))
  }

  handleDelete = () => {
    const {type, comment_id, article_id} =  this.props
    serverDeleteRequest(`${type}s/${comment_id || article_id}`)
    if (this.props.type === 'article') {navigate('/articles/all')}
  }

  render() {
    const { user } = this.props
    const {article: art} = this.state
    return (
      <div className="SingleArticle">
        {art && <ul>
            {art.author === user && <Delete type='article' article_id={art.article_id}/>}
            <li><h2>{art.title}</h2></li>
            <li><h3>Author: {art.author} - Date listed: {moment(art.created_at).format('D MMM YY')} - Topic: {art.topic}</h3></li>
            <li>{art.body}</li>
            <br/>
            <Votes article_id={art.article_id} votes={art.votes} target='articles'/>
            <CommentList article_id={art.article_id} user={user} comment_count={art.comment_count}/>
        </ul>}      
      </div>
    )
  }
}
