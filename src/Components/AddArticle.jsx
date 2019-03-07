import React, { Component, Fragment } from 'react'
import {serverGetRequest, serverPostRequest} from '../utils/axios'
import { navigate } from '@reach/router'
// import { handleChange } from '../utils/handle'

export default class AddArticle extends Component {
    state = {
        topics: [],
        postBody: {},
        newTopic: false
    }

    componentDidMount() {
        this.fetchLists()
    }

    fetchLists = () => {
        return serverGetRequest('topics')
        .then(topics => this.setState({ topics: topics.data.topics }))
    }

    handleArticleSubmit = (e) => {
        e.preventDefault()
        const {user:author} = this.props
        const {newTopic, postBody: {topic:slug, description}} = this.state
        if (newTopic) {
            serverPostRequest('/topics', {slug, description})
            .then(() => {
                serverPostRequest('/articles', {...this.state.postBody, author})
                .then(({data: {article}}) => navigate(`/article/${article.article_id}`))
            })
        } else serverPostRequest('/articles', {...this.state.postBody, author})
                .then(({data: {article}}) => navigate(`/article/${article.article_id}`))
    }

    handleChange = (e) => {
        const t = e.target;
        if (t.value !== 'Add new topic...') {
            this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }))
        } else this.setState({newTopic: true})
    }

    render() {
        const {topics, newTopic} = this.state
      return (
        <div className='formpage'>
            <h2>Add new article:</h2>
            <form onSubmit={this.handleArticleSubmit}>
                <input required name='title' type="text" placeholder="title" onChange={this.handleChange}/>
                <br/>
                    <select required name='topic' onChange={this.handleChange} defaultValue='Select topic...'>
                        <option disabled >Select topic...</option>
                        <option >Add new topic...</option>
                        {topics.map(topic => <option key={topic.slug} value={topic.slug}>{topic.slug}</option>)}
                    </select> 
                    {newTopic && (
                        <Fragment>
                            <input name='topic' onChange={this.handleChange} type='text' placeholder='new topic...'></input>
                            <input name='description' onChange={this.handleChange} type='text' placeholder='topic description'></input>
                        </Fragment>
                    )}
                <br/>
                <textarea required onChange={this.handleChange} name='body' placeholder='start writing your article here...' rows='5' cols='50'/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
      )
    }
}
