import React, { Component } from 'react'
import {serverGetRequest, serverPostRequest} from '../utils/axios'
import { navigate } from '@reach/router'

export default class AddArticle extends Component {
    state = {
        topics: [],
        authors: [],
        newArticle: {}
    }

    componentDidMount() {
        this.fetchLists()
    }

    fetchLists = () => {
        return Promise.all([serverGetRequest('topics'), serverGetRequest('users')])
        .then(([topics, users]) => {
        this.setState({ topics: topics.data.topics, authors: users.data.users });
        })
    }

    handleArticleSubmit = (e) => {
        e.preventDefault()
        serverPostRequest('/articles', this.state.newArticle)
        .then(({data: {article}}) => {
            navigate(`/article/${article.article_id}`)
        })
    }

    handleChange = (e) => {
        const t = e.target
        this.setState(({newArticle}) => {
            return {newArticle: {...newArticle, [t.name]: t.value}}
        })
    }

    render() {
        const {topics, authors} = this.state
        console.dir(this.state.newArticle)
      return (
        <div className='formpage'>
            <h2>Add new article:</h2>
            <form onSubmit={this.handleArticleSubmit}>
                <input name='title' type="text" placeholder="title" onChange={this.handleChange}/>
                <br/>
                <select name='topic' onChange={this.handleChange} defaultValue='Select topic...'>
                    <option disabled >Select topic...</option>
                    <option>Add new topic...</option>
                    {topics.map(topic => <option key={topic.slug} value={topic.slug}>{topic.slug}</option>)}
                </select>
                <select name='author' onChange={this.handleChange}>
                    {authors.map(author => <option key={author.username} value={author.username}>{author.username}</option>)}
                </select>
                <br/>
                <textarea onChange={this.handleChange} name='body' placeholder='start writing your article here...' rows='5' cols='50'/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
      )
    }
}
