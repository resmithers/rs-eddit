import React, { Component } from 'react'
import { Link, Router } from '@reach/router'
import { serverGetRequest } from '../utils/axios';
import UserCard from './UserCard';

export default class Users extends Component {
  state = {
      users: []
  }

  componentDidMount () {
    this.fetchUsers()
  }

  fetchUsers = () => {
      serverGetRequest('/users').then(({data: {users}}) => this.setState({users}))
  }

  render() {
      const { users } = this.state
      const { user } = this.props
    return (
      <>
      <ul className='users'>
        {users.map(({username}) => <Link key={username} to={`/${username}`}><li >{username}</li></Link>)}
      </ul>
      <Router><UserCard path=':user_id' loggedInUser={user}/></Router>

      </>
    )
  }
}
