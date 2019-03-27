import React, { Component } from 'react';
import { Router, Redirect, navigate } from '@reach/router';
import Header from './Components/Header';
import SingleArticleLayout from './Components/SingleArticleLayout';
import Articles from './Components/Articles';
import AddUser from './Components/AddUser';
import Users from './Components/Users';
import Splash from './Components/Splash';
import Handle404 from './Components/Handle404';
import req from './utils/axios';
import './App.css';

export default class App extends Component {
	state = {
		user: null,
		topics: [],
		users: [],
	};

	componentDidMount = () => {
		this.fetchLists();
		this.setState({ user: window.localStorage.getItem('user') });
	};

	handleLogin = e => {
		e.preventDefault();
		const input = e.target[0];
		const { value } = input;
		const logInOut = e.target[1].name;

		if (logInOut === 'login') {
			this.setState({ user: value });
			window.localStorage.setItem('user', value);
		} else {
			input.value = null;
			this.setState({ user: null });
			window.localStorage.removeItem('user');
			navigate('/sign-out');
		}
	};

	newUserLogin = value => {
    console.log(value)
		this.setState({ user: value });
		window.localStorage.setItem('user', value);
	};

	fetchLists = () => {
		Promise.all([req.get('/topics'), req.get('/users')]).then(
			([
				{
					data: { topics },
				},
				{
					data: { users },
				},
			]) => this.setState({ topics, users }),
		);
	};

	render() {
		const { user, topics, users } = this.state;
		return (
			<div className="App">
				<Header user={user} users={users} topics={topics} handleLogin={this.handleLogin} />
				{user && (
					<Router>
						<Handle404 default />
						<Redirect noThrow from="/" to="/articles/all" />
						<Redirect noThrow from="/sign-out" to="/articles/all" />
						<Articles path="/articles/:topics" user={user} topics={topics} />
						<Users path="/users/:user_id" user={user} topics={topics} />
						<SingleArticleLayout path="/article/:article_id" user={user} />
					</Router>
				)}
				{!user && (
					<Router>
						<AddUser default newUserLogin={this.newUserLogin} />
						<Splash path="/sign-out" />
					</Router>
				)}
			</div>
		);
	}
}
