import React from 'react';
import { Link } from '@reach/router';


export default function Topics({ topics }) {
  return (
    <ul>
      {topics.map(({ slug }) => <Link key={slug} to={slug}><li>{slug}</li></Link>)}
    </ul>
  );
}
