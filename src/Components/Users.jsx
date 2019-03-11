import React, { Component } from 'react'
import { Router } from '@reach/router'
import UserCard from './UserCard';

export default class Users extends Component {
  state = {}

  render() {
    const { user } = this.props
    return (
      <>
        <Router><UserCard path=':user_id' loggedInUser={user}/></Router>
      </>
    )
  }
}
