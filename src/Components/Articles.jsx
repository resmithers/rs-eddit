import React, { Component } from 'react'
import LiArticle from './LiArticle';
import req from '../utils/axios';
import querystring from 'querystring'
import {Pagination} from 'react-bootstrap'

export default class Articles extends Component {
  state = {
    sort_by: 'created_at',
    order: 'desc',
    p: 1,
    limit: 10,
    articles: [],
    pages: []
  }

  componentDidMount () {
    const { topics } = this.props
    this.fetchArticles((topics === 'all' ? null : topics))
  }

  componentDidUpdate (prevProps, prevState) {
    const { p, sort_by, order } = this.state
    const { topics, location } = this.props
    const topic = (topics === 'all' ? null : topics)
    const author = querystring.parse(location.search.substr(1)).author

    const a = prevProps.topics !== topics;
    const b = prevState.sort_by !== sort_by;
    const c = prevState.order !== order;
    const d = prevProps.location !== location;
    const e = prevState.p !== p;

    if (a || b || c || d || e) {
      this.fetchArticles(topic, author, sort_by, order, p).then(() => document.querySelector('.articles').scrollTop = 0)
    }
  }

  handleOrder = ({target: {name, value}}) => {
    this.setState({[name]: value})
  }

  fetchArticles = (topic, author, sort_by, order, p) => {
    return req
      .get('/articles', {params: { topic, author, sort_by, order, p } })
      .then(({ data: {articles, total_articles} }) => {
        const pages = []
        for (let i = 0; i < Math.ceil(total_articles / this.state.limit); i++ ) {pages.push(i + 1)}
        this.setState({ articles, total_articles, pages })
      })
  }

  handlePageChange = ({dir, e}) => {
    let text = e ? +e.target.text : null;
    this.setState(({p}) => ({p: text || (p + dir)}))
  }

  paging = () => {
    const {p, pages} = this.state
    return (
      <Pagination style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination.Prev onClick={() => this.handlePageChange({dir: -1})}>{'<'}</Pagination.Prev>
        {pages.map(page => <Pagination.Item onClick={(e) => this.handlePageChange({e})} key={page} active={page === p}>{page}</Pagination.Item>)}
        <Pagination.Next onClick={() => this.handlePageChange({dir: 1})}>{'>'}</Pagination.Next>
      </Pagination>
    )
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
        {this.paging()}
        {articles.map((art, i) => <LiArticle key={i} art={art} topic={topics}/>)}
        {this.paging()}
      </div>
    )
  }
}
