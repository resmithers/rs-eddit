import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LiArticle from './LiArticle';

export default class Articles extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  componentDidMount () {
    this.props.fetchArticles(this.props.topics)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.topics !== this.props.topics) {
      this.props.fetchArticles(this.props.topics)
    }
  }

  render() {
    const { articles, topics } = this.props
    return (
      <ul className='articles'>
        {articles.map((art, i) =><LiArticle key={i} art={art} updateVotes={this.updateVotes} topic={topics}/>)}
      </ul>
    )
  }
}
