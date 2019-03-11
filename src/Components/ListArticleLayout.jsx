import React from 'react';
import { Router } from '@reach/router';
import Topics from './Topics';
import Articles from './Articles';

export default function ListArticleLayout({ topics }) {
  return (
    <div>
      {/* <Topics className="topics" topics={topics} /> */}
      <Router className="articles" primary={false}>
        <Articles path="/all" />
        <Articles path="/:topics" />
      </Router>
    </div>
  );
}
