/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Router } from '@reach/router'
import Header from './Components/Header';
import ArticleLayout from './Components/ArticleLayout';
import './App.css';
import ListArticleLayout from './Components/ListArticleLayout';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  state = {
    user: 'test_user'
  }
  render() {
    const {user} = this.state
    return (
      <div className="App">
        <Header user={user}/>
        <Router>
          <ListArticleLayout path='/articles/*' user={user}/>
          <ArticleLayout path='/article' user={user}/>
        </Router>
      </div>
    );
  }
}