import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Articles extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  componentDidMount () {
    this.props.fetchArticles()
  }

  render() {
    const { articles } = this.props
    return (
      <div>
        {articles.map((art, i) => {
          return <p key={ i }>{art.title || art}</p>
        })}
      </div>
    )
  }
}
