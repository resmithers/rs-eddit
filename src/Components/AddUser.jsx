import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { serverPostRequest } from '../utils/axios';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class AddUser extends Component {
	state = {
		postBody: {},
	};

	handleUserSubmit = e => {
		e.preventDefault();
		const { postBody } = this.state;
		if (!postBody.avatar_url)
			postBody.avatar_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
		serverPostRequest(`users`, { ...postBody }).then(({ data }) => {
			this.props.newUserLogin(data.user.username);
			navigate('/articles/all');
		});
	};

	handleChange = e => {
		const t = e.target;
		this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }));
	};

	render() {
		return (
			<Form onSubmit={this.handleUserSubmit}>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Name
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							name="name"
							type="text"
							placeholder="name"
							required
							onChange={this.handleChange}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Username
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							name="username"
							type="text"
							placeholder="username"
							required
							onChange={this.handleChange}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm={2}>
						Avatar Url
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							name="avatar_url"
							rows="18"
							placeholder="avatar_url"
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
