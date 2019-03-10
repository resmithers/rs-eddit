/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Votes from './Votes';

export default function LiArticle({ art }) {
  return (
    <ul key={art.article_id} className="LiArticle">
      <li><Link to={`/article/${art.article_id}`}>{art.title}</Link></li>
      <li>Author: {art.author}</li>
      <li>Date listed: {moment(art.created_at).format('D MMM YY')}</li>
      <li>Comments: {art.comment_count}</li>
      <Votes article_id={art.article_id} votes={art.votes} target="articles" />
    </ul>
  );
}
