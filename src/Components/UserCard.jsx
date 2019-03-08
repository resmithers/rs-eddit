import React, { Component } from 'react'
import req from '../utils/axios';

export default class UserCard extends Component {

    state = {
        user: null
    }

    componentDidMount () {this.getUserInfo()}

    componentDidUpdate (prevProps) {
        prevProps.user_id !== this.props.user_id && this.getUserInfo()
    }

    getUserInfo = () => {
        const {user_id} = this.props
        req.get(`users/${user_id}`).then(({data: {user}}) => this.setState({user}))
    }

    render() {
        const {user} = this.state
        return (
          <>
            {user && (
                <>
                <p>{user.name}</p>
                <p>{user.username}</p>
                <img src={user.avatar_url} alt='user avatar'/>
                </>
            )}
          </>
        )
    }
}
