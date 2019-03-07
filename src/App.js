import React, { Component } from 'react';
import { Router, Link } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';
import AddArticle from './Components/AddArticle';
import AddUser from './Components/AddUser'
import Handle404 from './Components/Handle404';

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
          <Link to='/articles/all'>Articles</Link>
          <span> </span>
          <Link to='/add/article'>Add article</Link>
          <span> </span>
        </nav>
        {user && <Router>
          <Handle404 default/>
          <ListArticleLayout path='/articles/*/' user={user}/>
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