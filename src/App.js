import React, { Component } from 'react';
import { Router, Link } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';
import AddArticle from './Components/AddArticle';
import AddUser from './Components/AddUser'
import Handle404 from './Components/Handle404';
import Users from './Components/Users';

export default class App extends Component {
  state = {
    user: null
  }

  componentDidMount = () => {
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

  render() {
    const {user} = this.state
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
          <ListArticleLayout path='/articles/*/' user={user}/>
          <Users path='/users' user={user}/>
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