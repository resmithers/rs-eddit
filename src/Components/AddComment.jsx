import React, { Component } from 'react';
import req from '../utils/axios';
import { InputGroup, Button, Form } from 'react-bootstrap';

export default class AddComment extends Component {
	state = {
		postBody: {},
	};

	handleCommentSubmit = e => {
    e.preventDefault();
		const { article_id, user: author } = this.props;
    const { postBody } = this.state;
		req.post(`articles/${article_id}/comments`, { ...postBody, author }).then(() => {
			this.props.handleNewComment();
			document.querySelector('form').reset();
			this.setState({ postBody: {} });
		});
	};

	handleChange = ({ target: t }) => {
		this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }));
	};

	render() {
		return (
			<>
				<Form onSubmit={this.handleCommentSubmit}>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text id="desc">Add Comment:</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
              name="body"
							placeholder="Type here..."
							aria-label="comment"
							aria-describedby="desc"
							onChange={this.handleChange}
						/>
						<InputGroup.Append>
							<Button variant="primary" type="submit">Submit</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form>
			</>
		);
	}
}
