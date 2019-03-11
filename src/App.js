import React, { Component } from 'react';
import { Router, Redirect } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import Articles from './Components/Articles';
import AddArticle from './Components/AddArticle';
import AddUser from './Components/AddUser'
import Users from './Components/Users';
import req from './utils/axios';
import Handle404 from './Components/Handle404';

export default class App extends Component {
  state = {
    user: null,
    topics: [],
    users: []
  }

  componentDidMount = () => {
    this.fetchLists()
    this.setState({user: window.localStorage.getItem('user')})
  }

  handleLogin = (e) => {
    e.preventDefault()
    const input = e.target[0]
    const {value} = input
    const logInOut = e.target[1].name
    
    if (logInOut === 'login') {
      this.setState({user: value})
      window.localStorage.setItem('user', value)
    } else {
      input.value = null
      this.setState({user: null})
      window.localStorage.removeItem('user')
    }
  }

  fetchLists = () => {
    Promise.all([
      req.get('/topics'),
      req.get('/users')])
      .then(([{ data: {topics} }, {data: {users}}]) => this.setState({ topics, users }))
    }

  render() {
    const {user, topics, users} = this.state
    return (
      <div className="App">
        <Header user={user} users={users} topics={topics} handleLogin={this.handleLogin} />
        {user && <Router>
          <Handle404 default/>
          <Redirect from='/' to='/articles/all'/>
          <Articles path='/articles/:topics' user={user} topics={topics}/>
          <Users path='/users/*' users={users} user={user}/>
          <SingleArticleLayout path='/article/:article_id' user={user}/>
          <AddArticle path='/add/article' user={user}/>
        </Router>}
        <Router>
          <AddUser path='/add/user' />
        </Router>
      </div>
    );
  }
}