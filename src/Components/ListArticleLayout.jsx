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

  displayTopics = () => {
    req
      .get('/topics')
      .then(({ data }) => this.setState({ topics: data.topics }));
  }

  fetchArticles = (topic, sort_by) => {
    console.log(sort_by)
    req
      .get('/articles', {params: { topic, sort_by } })
      .then(({ data: {articles} }) => this.setState({ articles }))
  }

  render() {
    const { topics, articles } = this.state
    return (
      <div className='grid'>
        <Topics topics={topics} fetchTopics={this.displayTopics}/>
        <Router primary={false}>
          <Articles path='/all' fetchArticles={this.fetchArticles}/>
          <Articles path='/:topics' fetchArticles={this.fetchArticles}/>
        </Router>
      </div>
    )
  }
}
