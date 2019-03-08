import React, { Component, Fragment } from 'react'
import req from '../utils/axios'
import { navigate } from '@reach/router'

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
        req
        .get('topics')
        .then(topics => this.setState({ topics: topics.data.topics }))
    }

    handleArticleSubmit = (e) => {
        e.preventDefault()
        const {user:author} = this.props
        const {newTopic, postBody: {topic, description, ...postBody}} = this.state

        Promise.resolve(newTopic && req.post('topics', {slug:topic, description}))
            .then(() => req.post('/articles', {...postBody, topic, author}))
            .then(({data: {article}}) => navigate(`/article/${article.article_id}`))
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState(({postBody}) => value === 'Add new topic...' ? {newTopic: true} : { postBody: { ...postBody, [name]: value } })
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
                    {topics.map(({slug}) => <option key={slug} value={slug}>{slug}</option>)}
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
