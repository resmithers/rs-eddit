import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Topics from './Topics';
import Articles from './Articles';
import { Router } from '@reach/router';
import querystring from 'querystring'
import {serverGetRequest} from '../utils/axios'

export default class ListArticleLayout extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  }

  state = {
    topics: [],
    articles: []
  }

  componentDidCatch (err, info) {
    console.log(err, info)
  }

  displayTopics = () => {
    serverGetRequest('topics')
    .then(({ data }) => this.setState({ topics: data.topics }));
  }

  fetchArticles = (topic = '') => {
    serverGetRequest('articles?' + querystring.stringify({topic}))
      .then(({data}) => {
        this.setState({ articles: data.articles})
      })
  }

  render() {

    const { topics, articles } = this.state
    return (
      <div className='grid'>
        <Topics topics={topics} fetchTopics={this.displayTopics}/>
        <Router primary={false}>
          <Articles path='/:topics' articles={articles} fetchArticles={this.fetchArticles}/>
        </Router>
      </div>
    )
  }
}
