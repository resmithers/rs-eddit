import React, { Component } from 'react'
import { Link } from '@reach/router'
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
      <ul>
        {topics.map((topic, i) => {
          return <Link key={i} to={`${topic.slug}`}><li >{topic.slug}</li></Link>
        })}
      </ul>
    )
  }
}
