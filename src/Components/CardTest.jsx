import React from 'react';
import { Card } from 'react-bootstrap';

export default function CardTest() {
  const arr = [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }];
  return (
    <>
      {arr.map(a => (
        <Card>
          <Card.Title>{a.name}</Card.Title>
          <Card.Body>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
