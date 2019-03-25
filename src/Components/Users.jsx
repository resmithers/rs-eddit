import React, { Component } from 'react';
import req from '../utils/axios';
import { Card } from 'react-bootstrap';
import LiArticle from './LiArticle';
import Error from './Error';

export default class Users extends Component {
	state = {
		user: null,
		articles: [],
		error: false,
	};

	componentDidMount() {
		this.getUserInfo();
		this.fetchArticles();
	}

	componentDidUpdate(prevProps) {
		const { user_id } = this.props;
		if (prevProps.user_id !== user_id) {
			this.getUserInfo();
			this.fetchArticles();
		}
	}

	getUserInfo = () => {
		const { user_id } = this.props;
		req.get(`users/${user_id}`).then(({ data: { user } }) => this.setState({ user }));
	};

	fetchArticles = () => {
		const { user_id: author } = this.props;
		return req
			.get('/articles', { params: { author, limit: 3 } })
			.then(({ data }) => this.setState({ articles: data.articles, error: false }))
			.catch(() => this.setState({ error: true }));
	};

	render() {
		const { user, articles, error } = this.state;
		return (
			<>
				<div className="users">
					{!user && <div className="loader" />}
					{user && (
						<>
							<img className="avatar" src={user.avatar_url} alt="Avatar" />
							<Card style={{ width: '80vw' }}>
								<Card.Header>Name: {user.name}</Card.Header>
								<Card.Text>Username: {user.username}</Card.Text>
								<div className="recent">
                                    {error && <Error />}
                                    <Card.Text>Most recent articles:</Card.Text>
									{articles.map(a => (
										<LiArticle key={a.article_id} art={a} />
									))}
								</div>
							</Card>
						</>
					)}
				</div>
			</>
		);
	}
}
