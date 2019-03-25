import React, { Component } from 'react';
import req from '../utils/axios';
import Votes from './Votes';
import CommentList from './CommentList';
import Delete from './Delete';
import moment from 'moment';
import { Card } from 'react-bootstrap';

export default class SingleArticleLayout extends Component {
	state = {
		article: null,
	};

	componentDidMount = () => {
		this.fetchSingleArticle();
	};

	fetchSingleArticle = () => {
		const { article_id } = this.props;
		req.get(`articles/${article_id}`).then(({ data: { article } }) => this.setState({ article }));
	};

	handleDelete = () => {
		const { type, comment_id, article_id } = this.props;
		req.delete(`${type}s/${comment_id || article_id}`);
	};

	render() {
		const { user } = this.props;
    const { article: art } = this.state;
		return (
			<div className="SingleArticle">
				{art && (
					<>
						<Card>
							<Card.Header>{art.title}</Card.Header>
							<br />
							<Card.Subtitle>
								Author: {art.author} - Posted: {moment(art.created_at).format('D MMM YY')}
							</Card.Subtitle>
							<Card.Body>{art.body}</Card.Body>
							<Card.Subtitle>Comments: {art.comment_count}</Card.Subtitle>
							<br />
							<Votes article_id={art.article_id} votes={art.votes} target="articles" />
							<br />
							{user === art.author && <Delete type="article" article_id={art.article_id} onDelete={this.handleDelete} />}
						</Card>
						<br />
						<CommentList
							article_id={art.article_id}
							user={user}
							comment_count={art.comment_count}
						/>
					</>
				)}
			</div>
		);
	}
}
