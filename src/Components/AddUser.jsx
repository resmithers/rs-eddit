import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { serverPostRequest } from '../utils/axios';

export default class AddUser extends Component {
	state = {
		postBody: {},
	};

	handleUserSubmit = e => {
		e.preventDefault();
    const { postBody } = this.state;
    if (!postBody.avatar_url) postBody.avatar_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
		serverPostRequest(`users`, { ...postBody }).then(() => navigate('/articles/all'));
	};

	handleChange = e => {
		const t = e.target;
		this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }));
	};

	render() {
		return (
			<form onSubmit={this.handleUserSubmit}>
				<input required name="name" type="text" placeholder="name" onChange={this.handleChange} />
				<input required name="username" type="text" placeholder="username" onChange={this.handleChange} />
				<input name="avatar_url" type="email" placeholder="img_url" onChange={this.handleChange} />
				<button type="submit">Submit</button>
			</form>
		);
	}
}
