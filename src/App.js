/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Router } from '@reach/router'
import Header from './Components/Header';
import ArticleLayout from './Components/ArticleLayout';
import './App.css';
import TopicLayout from './Components/TopicLayout';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  state = {
    user: 'test_user'
  }
  render() {
    const {user} = this.state
    return (
      <div className="App">
        <Header user={user}/>
        <Router>
          <TopicLayout path='/topics' user={user}/>
          <ArticleLayout path='/articles' user={user}/>
        </Router>
      </div>
    );
  }
}

export default App;
