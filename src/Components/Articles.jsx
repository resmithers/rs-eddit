import React, { Component } from 'react';
import LiArticle from './LiArticle';
import req from '../utils/axios';
import querystring from 'querystring';
import Pages from './Paginations';
import Error from './Error';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

export default class Articles extends Component {
	state = {
		sort_by: 'created_at',
		order: 'desc',
		p: 1,
		limit: 10,
		articles: [],
		pages: [],
		error: false,
	};

	componentDidMount() {
		const { topics } = this.props;
		this.fetchArticles(topics === 'all' ? null : topics);
	}

	componentDidUpdate(prevProps, prevState) {
		const { p, sort_by, order } = this.state;
		const { topics, location, user_id } = this.props;
		const topic = topics === 'all' ? null : topics;
		const author = user_id || querystring.parse(location.search.substr(1)).author;

		const a = prevProps.topics !== topics;
		const b = prevState.sort_by !== sort_by;
		const c = prevState.order !== order;
		const d = prevProps.location !== location;
		const e = prevState.p !== p;

		if (a || b || c || d || e) {
			this.fetchArticles(topic, author, sort_by, order, p).then(() => {
				document.querySelector('.articles').scrollTop = 0;
			});
		}
	}

	handleOrder = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	};

	fetchArticles = (topic, author, sort_by, order, p) => {
		return req
			.get('/articles', { params: { topic, author, sort_by, order, p } })
			.then(({ data: { articles, total_articles } }) =>
				this.setState({ articles, total_articles, error: false }),
			)
			.catch(() => this.setState({ error: true }));
	};

	handlePageChange = ({ dir, e }) => {
		let text = e ? +e.target.text : null;
		this.setState(({ p }) => ({ p: text || p + dir }));
	};

	render() {
		const { topics } = this.props;
		const { articles, p, total_articles, limit, error, sort_by, order } = this.state;
		const data = { content: total_articles, p, limit, handlePageChange: this.handlePageChange };

		return (
			<div className="articles">
				{articles.length < 1 && <div className="loader" />}
				{error && <Error topics={topics} />}
				{!error && articles.length > 1 && (
					<>
						<ButtonToolbar className="sort_toolbar">
							<ButtonGroup className="btn-space">
								<Button
									disabled={sort_by === 'created_at'}
									onClick={this.handleOrder}
									name="sort_by"
									value="created_at"
								>
									created at
								</Button>
								<Button
									disabled={sort_by === 'votes'}
									onClick={this.handleOrder}
									name="sort_by"
									value="votes"
								>
									votes
								</Button>
								<Button
									disabled={sort_by === 'comment_count'}
									onClick={this.handleOrder}
									name="sort_by"
									value="comment_count"
								>
									comment count
								</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button
									disabled={order === 'desc'}
									onClick={this.handleOrder}
									name="order"
									value="desc"
								>
									desc
								</Button>
								<Button
									disabled={order === 'asc'}
									onClick={this.handleOrder}
									name="order"
									value="asc"
								>
									asc
								</Button>
							</ButtonGroup>
						</ButtonToolbar>
						<Pages data={data} />
						{articles.map((art, i) => (
							<LiArticle key={i} art={art} />
						))}
						<Pages data={data} />
					</>
				)}
			</div>
		);
	}
}
