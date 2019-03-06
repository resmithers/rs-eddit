import React, { Component } from 'react';
import { Router, Link } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';
import AddArticle from './Components/AddArticle';
import AddComment from './Components/AddComment';

export default class App extends Component {
  state = {
    user: 'test_user'
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
        </nav>
        <Router>
          <ListArticleLayout path='/articles/*' user={user}/>
          <SingleArticleLayout path='/article/:article_id' user={user}/>
          <AddArticle path='/add/article'/>
          <AddComment path='/add/comment'/>
        </Router>
      </div>
    );
  }
}