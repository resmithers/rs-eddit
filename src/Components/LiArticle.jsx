/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import Votes from './Votes';

export default function LiArticle({ art }) {
  return (
    <Card>
      <Card.Header><Link to={`/article/${art.article_id}`}>{art.title}</Link></Card.Header>
      <br />
      <Card.Subtitle>Author: {art.author}</Card.Subtitle>
      <Card.Body>
        Date listed: {moment(art.created_at).format('D MMM YY')}
        <br />
        Comments: {art.comment_count}
      </Card.Body>
      <Votes article_id={art.article_id} votes={art.votes} target="articles" />
      <br />
    </Card>
  );
}
