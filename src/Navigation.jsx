import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import {
  Button,
  FormGroup,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap';

class MyNavbar extends Component {
  constructor() {
    super();
    this.createHandler = this.createHandler.bind(this);
  }
  createHandler() {
    console.log('new', this.props);
    this.props.router.push('/new');
  }
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
              <Button bsStyle="success" onClick={this.createHandler}>New Entry</Button>
            </Navbar.Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
MyNavbar.propTypes = {
  router: React.PropTypes.object,
};

export default withRouter(MyNavbar);
