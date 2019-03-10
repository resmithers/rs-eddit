import React, { Component } from 'react'
import req from '../utils/axios'
import { navigate } from '@reach/router'

export default class AddArticle extends Component {
    state = {
        topics: [],
        postBody: {},
        showNewTopic: null
    }

    componentDidMount() {
        this.fetchLists()
    }

    componentDidUpdate(z, pState) {
        // if (pState.postBody.topic !== this.state.postBody.topic)
    }

    fetchLists = () => {
        req
        .get('topics')
        .then(({data: {topics}}) => this.setState({ topics }))
    }

    handleArticleSubmit = (e) => {
        e.preventDefault()
        const {user:author} = this.props
        const {showNewTopic, postBody: {topic, description, ...a}} = this.state

        Promise
            .resolve(showNewTopic && req.post('topics', {slug:topic, description}))
            .then(() => req.post('/articles', {...a, topic, author}))
            .then(({data: {article}}) => navigate(`/article/${article.article_id}`))
    }

    handleChange = (e) => {
        const {name, value, selectedIndex} = e.target
        if (selectedIndex === 1) this.setState({showNewTopic: 1})
        this.setState(({postBody}) => ({ postBody: { ...postBody, [name]: value } }))
    }

    render() {
        const {topics, showNewTopic} = this.state
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
                {showNewTopic && (<>
                    <input name='topic' onChange={this.handleChange} type='text' placeholder='new topic...'></input>
                    <input name='description' onChange={this.handleChange} type='text' placeholder='topic description'></input>
                </>)}
                <br/>
                <textarea required onChange={this.handleChange} name='body' placeholder='start writing your article here...' rows='5' cols='50'/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
      )
    }
}
