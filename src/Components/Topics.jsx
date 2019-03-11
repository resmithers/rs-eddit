import React from 'react';
import { Link } from '@reach/router';
import { ListGroup } from 'react-bootstrap';


export default function Topics({ topics }) {
  return (
    <ListGroup>
      {topics.map(({ slug }) => <ListGroup.Item><Link key={slug} to={slug}><li>{slug}</li></Link></ListGroup.Item>)}
    </ListGroup>
  );
}
