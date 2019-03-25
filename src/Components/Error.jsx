import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { navigate } from '@reach/router';

export default function Error({ topics }) {
  return (
    <>
      <Jumbotron>
        <h3>There are currently no articles on {`'${topics}'`}</h3>
        <p>oops</p>
        <Button onClick={() => navigate('/add/article')}>Why don't you add one?</Button>
        <Button onClick={() => navigate('/articles/all')}>All articles</Button>
      </Jumbotron>
    </>
  );
}
