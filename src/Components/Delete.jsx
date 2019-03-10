import React from 'react';
import { navigate } from '@reach/router';
import req from '../utils/axios';

export default function Delete({
  type, comment_id, article_id, onDelete,
}) {
  const handleDelete = () => {
    req
      .delete(`${type}s/${comment_id || article_id}`)
      .then(() => {
        comment_id && onDelete();
        article_id && navigate('/articles/all');
      });
  };

  return (<button type="button" onClick={handleDelete}>Delete {type} {comment_id}</button>);
}
