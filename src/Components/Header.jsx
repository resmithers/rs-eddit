import React, { Component } from 'react';
import {
  Navbar, Nav, Form, FormControl, Button, InputGroup, Dropdown
} from 'react-bootstrap';
import { navigate } from '@reach/router';

export default class Header extends Component {
  state = {
    defaultPlaceHolder: 'Username'
  }

  render() {
    const { defaultPlaceHolder } = this.state
    const { topics, user, users, handleLogin } = this.props;
    topics.sort((a, b) => a.slug > b.slug ? 1 : -1)
    users.sort((a, b) => a.username > b.username ? 1 : -1)
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>rs-eddit</Navbar.Brand>
          <Nav className="mr-auto">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>Articles</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/articles/all')}>all</Dropdown.Item>
                <Dropdown.Header>topics</Dropdown.Header>
                {topics.map(({slug}) => <Dropdown.Item key={slug} onClick={() => navigate(`/articles/${slug}`)}>{slug}</Dropdown.Item>)}
                <Dropdown.Header>users</Dropdown.Header>
                {users.map(({username}) => <Dropdown.Item key={username} onClick={() => navigate(`/articles/all?author=${username}`)}>{username}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>Users</Dropdown.Toggle>
              <Dropdown.Menu>
                {users.map(({username}) => <Dropdown.Item key={username} onClick={() => navigate(`/users/${username}`)}>{username}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link onClick={() => navigate('/add/article')}>Add Article</Nav.Link>
          </Nav>
          <Nav>
            <Form inline onSubmit={handleLogin}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  disabled={user}
                  placeholder={user || defaultPlaceHolder}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                {!user ? <Button name='login' type="submit">Log in</Button> : <Button name='logout' variant='danger' type="submit">Log out</Button>}
              </InputGroup>
            </Form>
          </Nav>
        </Navbar>
      </>
    );
  }
}
