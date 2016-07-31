import React from 'react';
import MyNavbar from './Navigation.jsx';
import Sidebar from './Sidebar.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
export default class App extends React.Component {
  render() {
    return (<div>
      <MyNavbar />
      <Grid>
        <Row className="show-grid">
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}
App.propTypes = { children: React.PropTypes.object };
