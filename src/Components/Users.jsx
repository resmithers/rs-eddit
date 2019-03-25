import React, { Component } from 'react';
import req from '../utils/axios';
import { Card } from 'react-bootstrap';
import LiArticle from './LiArticle';
import Error from './Error';

export default class Users extends Component {
	state = {
		user: null,
		articles: [],
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
			.get('/articles', { params: { author } })
			.then(({ data }) => this.setState({ articles: data.articles, error: false }))
			.catch(() => this.setState({ error: true }));
	};

	render() {
		const { user, articles } = this.state;
		return (
			<>
				<div className="users">
					{!user && <div className="loader" />}
					{user && (
						<>
							<img src={user.avatar_url} alt="Avatar"/>
							<Card style={{ width: '80vw' }}>
								<Card.Header>{user.name}</Card.Header>
								<Card.Text>{user.username}</Card.Text>
								<Card.Footer>Most recent articles: </Card.Footer>
								<div className="recent">
                                    {articles.length === 0 && <Error />}
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
