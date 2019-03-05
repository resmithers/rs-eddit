import React, { Component } from 'react';
import { Router, Link } from '@reach/router'
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';

export default class App extends Component {
  state = {
    user: 'test_user'
  }
  render() {
    const {user} = this.state
    return (
      <div className="App">
        <Header user={user}/>
        <Link to='/articles/all'>Articles</Link>
        <Router>
          <ListArticleLayout path='/articles/*' user={user}/>
          <SingleArticleLayout path='/article/:article_id' user={user}/>
        </Router>
      </div>
    );
  }
}