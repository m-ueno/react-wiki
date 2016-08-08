import React, { Component } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = { allEntries: [] };
    this.fetchRecent = this.fetchRecent.bind(this);
    this.fetchRecentExternalDB = this.fetchRecentExternalDB.bind(this);
  }
  componentDidMount() {
    this.fetchRecentExternalDB();
  }
  fetchRecentExternalDB() {
    const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
    const queryStr = `{
  entries(limit:20) {
 		id
    title
    author {
      name
    }
  }
}`;
    const queryOptions = {
      method: 'GET',
      mode: 'cors',
    };
    const queryURI = `${graphqlEndpoint}?query=${encodeURIComponent(queryStr)}`;

    fetch(queryURI, queryOptions)
      .then(res => res.json())
      .then(json => {
        console.log('entries', json);
        this.setState({ allEntries: json.data.entries });
      })
      .catch(e => {
        console.error(e);
      });
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
      <li key={e.id}><Link to={`/entry/${e.id}`}>{e.title}</Link></li>
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
