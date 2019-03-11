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
import CardTest from './Components/CardTest';

export default class App extends Component {
  state = {
    user: null,
    topics: []
  }

  componentDidMount = () => {
    this.fetchTopics()
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

  fetchTopics = () => {
    req
      .get('/topics')
      .then(({ data: {topics} }) => this.setState({ topics }));
  }

  render() {
    const {user, topics} = this.state
    return (
      <div className="App">
        <Header user={user} topics={topics} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
        {user && <Router>
          <CardTest default/>
          <Redirect from='/' to='/articles/all'/>
          <Articles path='/articles/:topics' user={user} topics={topics}/>
          <Users path='/users/*' user={user}/>
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