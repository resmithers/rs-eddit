import React, { Component } from 'react'
import { navigate } from '@reach/router';
import {serverPostRequest} from '../utils/axios'

export default class AddUser extends Component {
    state = {

    }

    handleUserSubmit = (e) => {
        e.preventDefault()
        serverPostRequest(`users`, {...this.state.postBody})
        .then(() => {
          navigate('/articles/all')
        })
      }
  
    handleChange = (e) => {
      const t = e.target;
      this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }));
    }

    render() {
      return (
        <form onSubmit={this.handleUserSubmit}>
            <input name='name' type='text' placeholder='name' onChange={this.handleChange}/>
            <input name='username' type='text' placeholder='username' onChange={this.handleChange}/>
            <input name='avatar_url' type='text' placeholder='img_url' onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
          </form>
      )
    }
}
