import React, { Component } from 'react'
import LiArticle from './LiArticle';
import req from '../utils/axios';
import querystring from 'querystring'

export default class Articles extends Component {
  state = {
    sort_by: 'created_at',
    order: 'desc',
    articles: []
  }

  componentDidMount () {
    const { topics } = this.props
    this.fetchArticles((topics === 'all' ? null : topics))
  }

  componentDidUpdate (prevProps, prevState) {
    const { sort_by, order } = this.state
    const { topics, location } = this.props
    const topic = (topics === 'all' ? null : topics)
    const author = querystring.parse(location.search.substr(1)).author

    const a = prevProps.topics !== topics;
    const b = prevState.sort_by !== sort_by;
    const c = prevState.order !== order;
    const d = prevProps.location !== location;

    if (a || b || c || d) this.fetchArticles(topic, author, sort_by, order)
  }

  handleOrder = ({target: {name, value}}) => {
    this.setState({[name]: value})
  }

  fetchArticles = (topic, author, sort_by, order) => {
    req
      .get('/articles', {params: { topic, author, sort_by, order } })
      .then(({ data: {articles} }) => this.setState({ articles }))
  }

  render() {
    const { topics } = this.props;
    const { articles } = this.state;
    return (
      <div className='articles'>
        <form>
          Sort by: 
            <select name='sort_by' onChange={this.handleOrder}>
              <option default value='created_at'>Date</option>
              <option value='votes'>Votes</option>
              <option value='comment_count'>Comments</option>
            </select>
          Order: 
          <select name='order' onChange={this.handleOrder}>
            <option default value='desc'>desc</option>
            <option value='asc'>asc</option>
          </select>
        </form>
        {articles.map((art, i) => <LiArticle key={i} art={art} topic={topics}/>)}
      </div>
    )
  }
}
