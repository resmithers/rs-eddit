import React, { Component } from 'react';

export default class Login extends Component {
    state = {
        user: null
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({user: e.target.value})
    }

    render() {
        const { handleLogin } = this.props
      return (
        <form onSubmit={(e) => handleLogin(this.state.user, e)}>
          <input onChange={this.handleChange}type="text"/>
          <button type='submit'>Submit..</button>
        </form>
      );
    }
}
