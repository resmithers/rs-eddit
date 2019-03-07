import React, { Component } from 'react'
import { Link } from '@reach/router'
import { serverGetRequest } from '../utils/axios';

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
    return (
      <ul className='users'>
        {users.map((user, i) => {
          return <Link key={i} to={user.username}><li >{user.username}</li></Link>
        })}
      </ul>
    )
  }
}
