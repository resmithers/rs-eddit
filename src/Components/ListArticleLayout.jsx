import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Topics from './Topics';
import Articles from './Articles';
import { Router } from '@reach/router';
import req from '../utils/axios'

export default class ListArticleLayout extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  }

  state = {
    topics: [],
    articles: []
  }

  componentDidMount () {
    this.fetchArticles()
  }

  displayTopics = () => {
    req
      .get('/topics')
      .then(({ data }) => this.setState({ topics: data.topics }));
  }

  fetchArticles = (topic) => {
    req
      .get('/articles', {params: { topic } })
      .then(({ data: {articles} }) => this.setState({ articles }))
  }

  render() {
    const { topics, articles } = this.state
    return (
      <div className='grid'>
        <Topics topics={topics} fetchTopics={this.displayTopics}/>
        <Router primary={false}>
          <Articles path='/all' articles={articles} fetchArticles={this.fetchArticles}/>
          <Articles path='/:topics' articles={articles} fetchArticles={this.fetchArticles}/>
        </Router>
      </div>
    )
  }
}
