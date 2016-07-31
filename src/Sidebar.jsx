import React, { Component } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = { allEntries: [] };
    this.fetchRecent = this.fetchRecent.bind(this);
  }
  componentDidMount() {
    this.fetchRecent();
  }
  fetchRecent() {
    fetch('/data/index.json')
      .then(r => r.json())
      .then(js => {
        this.setState({ allEntries: js });
      })
      .catch(e => {
        throw new Error(e);
      });
  }
  render() {
    const recent = this.state.allEntries.map(e =>
      <li key={e.id}><Link to={`/entry/${e.id}`}>{e.id}</Link></li>
    );
    return (
      <div>
        <h2>Sidebar</h2>
        <h3>Recent entries</h3>
        <ul>
          {recent}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
