import React, { Component } from 'react'
import LiArticle from './LiArticle';
import req from '../utils/axios';

export default class Articles extends Component {
  state = {
    sort_by: 'created_at',
    order: 'desc',
    articles: []
  }

  componentDidMount () {
    this.fetchArticles(this.props.topics, this.state.sort_by)
  }

  componentDidUpdate (prevProps, prevState) {
    const { sort_by, order } = this.state
    if ((prevProps.topics !== this.props.topics) || (prevState.sort_by !== sort_by || prevState.order !== order)) {
      this.fetchArticles(this.props.topics, sort_by, order)
    }
  }

  handleOrder = (e, q) => {
    const {value} = e.target
    this.setState({[q]: value})
  }

  fetchArticles = (topic, sort_by, order) => {
    req
      .get('/articles', {params: { topic, sort_by, order } })
      .then(({ data: {articles} }) => this.setState({ articles }))
  }

  render() {
    const { topics } = this.props
    const { articles } = this.state
    return (
      <ul className='articles'>
        <form>
          Sort by: 
            <select onChange={(e) => this.handleOrder(e, 'sort_by')}>
              <option default value='created_at'>Date</option>
              <option value='votes'>Votes</option>
              <option value='comment_count'>Comments</option>
            </select>
          Order: 
          <select onChange={(e) => this.handleOrder(e, 'order')}>
            <option default value='desc'>desc</option>
            <option value='asc'>asc</option>
          </select>
        </form>
        {articles.map((art, i) =><LiArticle key={i} art={art} updateVotes={this.updateVotes} topic={topics}/>)}
      </ul>
    )
  }
}
