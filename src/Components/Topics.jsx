import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.array
  }

  componentDidMount () {
    this.props.fetchTopics()
  }

  render() {
    const { topics } = this.props
    return (
      <div>
        {topics.map((topic, i) => {
          return <p key={topic.slug || i }>{topic.slug}</p>
        })}
      </div>
    )
  }
}
