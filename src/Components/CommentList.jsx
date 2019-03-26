import React, { Component } from 'react';
import AddComment from './AddComment';
import req from '../utils/axios';
import Comment from './Comment';
import Pages from './Paginations';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

export default class CommentList extends Component {
	state = {
		comments: [],
		p: 1,
		limit: 10,
		comment_count: +this.props.comment_count,
		sort_by: 'created_at',
		order: 'desc',
	};

	componentDidMount() {
		if (this.props.comment_count > 0) this.getComments();
	}

	componentDidUpdate(z, pState) {
		const { sort_by, order, p } = this.state;

		const a = pState.p !== p;
		const b = pState.sort_by !== sort_by;
		const c = pState.order !== order;

		if (a || b || c) this.getComments();
	}

	getComments = (d = 0) => {
		const { p, limit, sort_by, order } = this.state;
		const { article_id: id } = this.props;
		req
			.get(`articles/${id}/comments`, { params: { p, sort_by, order, limit } })
			.then(({ data: { comments } }) =>
				this.setState(({ comment_count }) => ({ comments, comment_count: comment_count + d })),
			);
	};

	handleOrder = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	};

	handlePageChange = ({ dir, e }) => {
		let text = e ? +e.target.text : null;
		this.setState(({ p }) => ({ p: text || p + dir }));
	};

	render() {
		const { comments, comment_count, p, limit, sort_by, order } = this.state;
		const { user, article_id } = this.props;
		const data = { content: comment_count, p, limit, handlePageChange: this.handlePageChange };
		return (
			<>
				<ButtonToolbar className="sort_toolbar">
					<ButtonGroup className="btn-space">
						<Button
							disabled={sort_by === 'created_at'}
							onClick={this.handleOrder}
							name="sort_by"
							value="created_at"
						>created at
						</Button>
						<Button
							disabled={sort_by === 'votes'}
							onClick={this.handleOrder}
							name="sort_by"
							value="votes"
						>votes
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button
							disabled={order === 'desc'}
							onClick={this.handleOrder}
							name="order"
							value="desc"
						>desc
						</Button>
						<Button
							disabled={order === 'asc'}
							onClick={this.handleOrder}
							name="order"
							value="asc"
							>asc
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
				
				<AddComment
					user={user}
					article_id={article_id}
					handleNewComment={() => this.getComments(1)}
				/>
				{comment_count > 0 && (
					<>
						{comments.map(c => (
							<Comment key={c.comment_id} comment={c} user={user} />
						))}
						<Pages data={data} />
					</>
				)}
			</>
		);
	}
}
