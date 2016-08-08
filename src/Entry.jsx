import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

class Entry extends Component {
  constructor() {
    super();
    this.state = { title: '', content: '' };
    this.fetchData = this.fetchData.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.eID = this.eID.bind(this);
  }
  componentDidMount() {
    this.fetchData(this.eID());
  }
  componentWillReceiveProps(nextProps) {
    const eID = this.props.entryID || this.props.params.entryID;
    if (nextProps.params.entryID !== eID) {
      this.fetchData(nextProps.params.entryID);
    }
  }
  eID() {
    return this.props.entryID || this.props.params.entryID;
  }
  editHandler() {
    this.props.router.push(`/entry/${this.eID()}/edit`);
  }
  fetchData(eID) {
    const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
    const queryStr = `{
  entry(id:${parseInt(eID, 10)}) {
    title
    content
    author {
      id
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
        console.log('entry', json);
        const { title, content } = json.data.entry;
        this.setState({ title, content });
      })
      .catch(e => {
        console.error(e);
      });
  }
  render() {
    const preStyle = { whiteSpace: 'pre-wrap' };
    return (
      <div>
        <h3>{this.state.title}</h3>
        <div style={preStyle}>
          {this.state.content}
        </div>
        {
          this.props.children
          ? this.props.children
          : <Button bsStyle="link" onClick={this.editHandler}>Edit</Button>
        }
      </div>
    );
  }
}
Entry.propTypes = {
  entryID: PropTypes.string,
  params: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default withRouter(Entry);
