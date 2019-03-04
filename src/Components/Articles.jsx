import React, { Component } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'

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
    const { articles } = this.props
    return (
      <ul>
        {articles.map((art, i) => {
          return <Link key={i} to={`/articles/${art.article_id}`}><li>{art.title || art}</li></Link>
        })}
      </ul>
    )
  }
}
