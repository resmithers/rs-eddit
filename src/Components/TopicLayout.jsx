import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Topics from './Topics';
import Articles from './Articles';
import axios from 'axios';

export default class TopicLayout extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  }

  state = {
    topics: ["Aardvarks", 'Bees', "Cats"],
    articles: ['I see articles', 'But these aren\'t real articles', 'Are you sure though?']
  }

  fetchTopics = () => {
    axios
      .get('https://rs-knews.herokuapp.com/api/topics')
      .then(({data}) => {
        this.setState({topics:data.topics})
      })
  }

  fetchArticles = (topic = '') => {
    axios
      .get(`https://rs-knews.herokuapp.com/api/articles${topic && '?topic=' + topic}`)
      .then(({data}) => {
        this.setState({ articles: data.articles})
      })
  }

  render() {

    const { topics, articles } = this.state
    return (
      <div>
        <Topics topics={topics} fetchTopics={this.fetchTopics}/>
        <Articles articles={articles} fetchArticles={this.fetchArticles}/>
      </div>
    )
  }
}
