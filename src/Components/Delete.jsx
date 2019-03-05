import React, { Component } from 'react';
import { serverDeleteRequest } from '../utils/axios'
import {navigate} from '@reach/router'

export default class Delete extends Component {
    state = {}

    handleDelete = () => {
        serverDeleteRequest(this.props.type + 's/' + (this.props.comment_id || this.props.article_id))
        if (this.props.type === 'article') {navigate('/articles/all')}
    }
    render() {
      return (<button onClick={this.handleDelete}>Delete {this.props.type} {this.props.comment_id}</button>);
    }
}
