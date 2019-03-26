import React, { Component } from 'react';
import req from '../utils/axios';
import { navigate } from '@reach/router';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class AddArticle extends Component {
	state = {
		topics: [],
		postBody: {},
		showNewTopic: false,
	};

	componentDidMount() {
		this.fetchLists();
	}

	fetchLists = () => {
		req.get('topics').then(({ data: { topics } }) => this.setState({ topics }));
	};

	handleArticleSubmit = e => {
		e.preventDefault();
		const { author, closeModal } = this.props;
		const {
			showNewTopic,
			postBody: { topic, description, ...a },
		} = this.state;

		Promise.resolve(showNewTopic && req.post('topics', { slug: topic.toLowerCase(), description }))
			.then(() => req.post('/articles', { ...a, topic: topic.toLowerCase(), author }))
			.then(({ data: { article } }) => {
				closeModal()
				navigate(`/article/${article.article_id}`)
			});
	};

	handleChange = ({ target: { name,  value, selectedIndex, length}}) => {
		if (selectedIndex === length - 1) {
			this.setState({ showNewTopic: true });
		} else {
			this.setState(({ postBody }) => ({
				postBody: { ...postBody, [name]: value }
			}));
		}
	};

	render() {
		const { topics, showNewTopic } = this.state;
		return (
			<Form onSubmit={this.handleArticleSubmit}>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Title
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							name="title"
							type="text"
							placeholder="Title"
							required
							onChange={this.handleChange}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Topic
					</Form.Label>
					<Col sm={10}>
						<Form.Control as="select" name="topic" required onChange={this.handleChange}>
							<option value="">Select topic...</option>
							{topics.map(({ slug }) => (
								<option key={slug} value={slug}>
									{slug}
								</option>
							))}
							<option>Add new topic...</option>
						</Form.Control>
						{showNewTopic && (
							<>
								<Form.Control
									name="topic"
									type="text"
									placeholder="New topic"
									onChange={this.handleChange}
								/>
								<Form.Control
									name="description"
									type="text"
									placeholder="Description..."
									onChange={this.handleChange}
								/>
							</>
						)}
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Article
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							as="textarea"
							name="body"
							rows="18"
							placeholder="Type here..."
							required
							onChange={this.handleChange}
						/>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		);
	}
}
