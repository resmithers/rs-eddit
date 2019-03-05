import React, { Component } from 'react';
import { serverDeleteRequest } from '../utils/axios'
import {navigate} from '@reach/router'

export default class Delete extends Component {
    state = {}

    handleDelete = () => {
        serverDeleteRequest('comments/' + this.props.comment_id)
    }
    render() {
      return (<button onClick={this.handleDelete}>Delete comment {this.props.comment_id}</button>);
    }
}
