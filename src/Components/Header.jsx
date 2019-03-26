import React, { Component } from 'react';
import AddArticle from './AddArticle';
import {
	Navbar,
	Nav,
	Form,
	Button,
	InputGroup,
	Dropdown,
	Modal,
} from 'react-bootstrap';
import { navigate } from '@reach/router';

export default class Header extends Component {
	state = {
		defaultPlaceHolder: 'Username',
		validUser: false,
		showModal: false
	};

	handleValidUser = ({ target: { value } }) => {
		const { users } = this.props;
		const validUser = users.map(user => user.username).includes(value);
		if (this.state.validUser !== validUser) this.setState({ validUser });
	};

	toggleAdd = () => {
		this.setState(({ showModal }) => ({ showModal: !showModal }));
	};

	render() {
		const { defaultPlaceHolder, validUser, showModal } = this.state;
		const { topics, user, users, handleLogin } = this.props;
		topics.sort((a, b) => (a.slug.toLowerCase() > b.slug.toLowerCase() ? 1 : -1));
		users.sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1));
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>rs-eddit</Navbar.Brand>
				<Nav className="mr-auto">
					<Dropdown as={Nav.Item}>
						<Dropdown.Toggle as={Nav.Link}>Articles</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => navigate('/articles/all')}>all</Dropdown.Item>
							<Dropdown.Header>topics</Dropdown.Header>
							{topics.map(({ slug }) => (
								<Dropdown.Item key={slug} onClick={() => navigate(`/articles/${slug}`)}>
									{slug}
								</Dropdown.Item>
							))}
							<Dropdown.Header>users</Dropdown.Header>
							{users.map(({ username }) => (
								<Dropdown.Item
									key={username}
									onClick={() => navigate(`/articles/all?author=${username}`)}
								>
									{username}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown as={Nav.Item}>
						<Dropdown.Toggle as={Nav.Link}>Users</Dropdown.Toggle>
						<Dropdown.Menu>
							{users.map(({ username }) => (
								<Dropdown.Item key={username} onClick={() => navigate(`/users/${username}`)}>
									{username}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Nav.Link onClick={() => this.toggleAdd()}>Add article</Nav.Link>
					<Modal show={showModal} onHide={() => this.toggleAdd()} dialogClassName="addArticleModal">
						<Modal.Header closeButton>
							<Modal.Title>Add article</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<AddArticle dialogClassName="addArticle" closeModal={() => this.toggleAdd()} author={user}/>
						</Modal.Body>
					</Modal>
				</Nav>
				<Nav>
					<Form onSubmit={e => {handleLogin(e); this.setState({ validUser: false })}}>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								disabled={user}
								placeholder={user || defaultPlaceHolder}
								aria-label="Username"
								aria-describedby="basic-addon1"
								onChange={this.handleValidUser}
							/>
							{!user && (
								<Button
									name="login"
									variant={validUser ? 'success' : 'primary'}
									disabled={!validUser}
									type="submit"
								>
									Log in
								</Button>
							)}
							{user && (
								<Button name="logout" variant="danger" type="submit">
									Log out
								</Button>
							)}
						</InputGroup>
					</Form>
				</Nav>
			</Navbar>
		);
	}
}
