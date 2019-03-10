import React, { Component } from 'react';
import { Router, Link, Redirect } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';
import AddArticle from './Components/AddArticle';
import AddUser from './Components/AddUser'
import Handle404 from './Components/Handle404';
import Users from './Components/Users';
import req from './utils/axios';

export default class App extends Component {
  state = {
    user: null,
    topics: []
  }

  componentDidMount = () => {
    this.fetchTopics()
    this.setState({user: window.localStorage.getItem('user')})
  }

  handleLogin = (user, e) => {
    e.preventDefault()
    this.setState({user})
    window.localStorage.setItem('user', user)
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.setState({user: null})
    window.localStorage.removeItem('user')
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
        <Header user={user} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
        <nav>
          <Link to='/articles/all'>Articles </Link>
          <Link to='/users'>Users </Link>
          <Link to='/add/article'>Add article </Link>
        </nav>
        {user && <Router>
          <Handle404 default/>
          <Redirect from='/' to='/articles/all'/>
          <ListArticleLayout path='/articles/*/' user={user} topics={topics}/>
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