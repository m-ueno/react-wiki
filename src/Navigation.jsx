import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  Button,
  FormGroup,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap';

export default class MyNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React Wiki</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <Navbar.Form>
              <FormGroup>
                <FormControl type="text" placeholder="search..." />
              </FormGroup>
              {' '}
              <Button bsStyle="link" type="submit">Search</Button>
            </Navbar.Form>
          </Nav>
          <Nav pullRight>
            <Navbar.Form>
              <Button bsStyle="success">New Entry</Button>
            </Navbar.Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
