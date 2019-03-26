import React, { Component } from 'react';
import req from '../utils/axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import LiArticle from './LiArticle';

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
			.get('/articles', { params: { author, limit: 5 } })
			.then(({ data }) => this.setState({ articles: data.articles, error: false }))
			.catch(() => this.setState({ error: true }));
	};

	render() {
		const { user, articles, error } = this.state;
		return (
			<div>
				{!user && <div className="loader" />}
				{user && (
					<>
						<Container>
							<Row>
								<Col sm={4} className="av">
									<Card >
										<Card.Img className="avatar" src={user.avatar_url} alt="Avatar" />
										<Card.Header>Name: {user.name}</Card.Header>
										<Card.Text>Username: {user.username}</Card.Text>
									</Card>
								</Col>
								<Col sm={8}>
									<Container fluid className='recent'>
										{!error && (
											<>
												<Card>
													<Card.Header>Most recent articles by {user.username}</Card.Header>
												</Card>
												{articles.map(a => (<LiArticle key={a.article_id} art={a}/>))}
											</>
										)}
									</Container>
								</Col>
							</Row>
						</Container>
					</>
				)}
			</div>
		);
	}
}
