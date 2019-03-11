import React, { Component } from 'react'
import { Link, Router } from '@reach/router'
import { serverGetRequest } from '../utils/axios';
import UserCard from './UserCard';

export default class Users extends Component {
  state = {
      users: []
  }

  render() {
    const { user, users } = this.props
    return (
      <>
      <ul className='users'>
        {users.map(({username}) => <Link key={username} to={`/users/${username}`}><li>{username}</li></Link>)}
      </ul>
      <Router><UserCard path=':user_id' loggedInUser={user}/></Router>
      </>
    )
  }
}
