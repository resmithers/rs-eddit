import React, { Component } from 'react';
import { Router, Link } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';
import AddArticle from './Components/AddArticle';
import AddComment from './Components/AddComment';
import Login from './Components/Login';

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

  render() {
    const {user} = this.state
    return (
      <div className="App">
        <Header user={user}/>
        <nav>
          <Link to='/articles/all'>Articles</Link>
          <span> </span>
          <Link to='/add/article'>Add article</Link>
          <span> </span>
          <Link to='/login'>Change user</Link>
        </nav>
        {!this.state.user && <Router>
          <Login path='*' handleLogin={this.handleLogin}/>
        </Router>}
        {user && <Router>
          <ListArticleLayout path='/articles/*' user={user}/>
          <SingleArticleLayout path='/article/:article_id' user={user}/>
          <AddArticle path='/add/article' user={user}/>
          <AddComment path='/add/comment' user={user}/>
          <Login path='/login' handleLogin={this.handleLogin}/>
        </Router>}
        
      </div>
    );
  }
}