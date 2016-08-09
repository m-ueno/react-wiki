import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Editor, EditorState, ContentState } from 'draft-js';
import { Button } from 'react-bootstrap';

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
    const initialEditorState = EditorState.createEmpty();
    this.state = { editorState: initialEditorState };
    this.onChange = (editorState) => this.setState({ editorState });
    this.discardHandler = this.discardHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    const eid = this.props.entryID || this.props.params.entryID;
    this.eID = parseInt(eid, 10);
    if (this.eID > 0) {
      this.fetchData();
    }
  }
  // componentWillReceiveProps() {
  //   this.fetchData();
  // }
  fetchData() {
    const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
    const queryStr = `{
  entry(id:${this.eID}) {
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
        console.log(json);
        const { content, title } = json.data.entry;
        const con = ContentState.createFromText(`${title}\n${content}`);
        const editorState = EditorState.createWithContent(con);
        this.setState({ editorState });
      })
      .catch(e => {
        console.error(e);
      });

    /*
    fetch(uri)
      .then(r => r.text())
      .then(txt => {
        const con = ContentState.createFromText(txt);
        const editorState = EditorState.createWithContent(con);
        this.setState({ editorState });
      })
      .catch(e => {
        throw new Error(e);
      });
      */
  }
  discardHandler() {
    this.props.router.push(`/entry/${this.props.params.entryID}`);
  }
  submitHandler() {
    // handle create or update
    const eID = this.eID;
    const text = this.state.editorState.getCurrentContent().getPlainText();
    const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;

    const title = text.split(/\r?\n/)[0].trim();
    const content = text.split(/\r?\n/)
      .splice(1)
      .join('\n')
      .trim()
      ;
    // const summary = content.substr(0, 100);
    const authorID = 1;
    // const tags = ['test'];
    // const body = { title, content, summary, author, tags };

    let queryStr;
    if (eID === 0) {
      queryStr = `mutation {
  createEntry(
    title: "${title}",
    content: ${JSON.stringify(content)},
    user_id: ${authorID},
  ) {
    id
  }
}
`;
    } else {
      queryStr = `mutation {
  updateEntry(
    entryID: ${this.eID},
    title: "${title}",
    content: ${JSON.stringify(content)},
    user_id: ${authorID},
  ) {
    id
  }
}
`;
    }
    console.log(queryStr);

    const postOptions = {
      method: 'POST',
      mode: 'cors',
    };

    const queryURI = `${graphqlEndpoint}?query=${encodeURIComponent(queryStr)}`;

    fetch(queryURI, postOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        alert('submit');
        let eid;
        if (eID === 0) {
          eid = json.data.createEntry.id;
        } else {
          eid = json.data.updateEntry.id;
        }
        this.props.router.push(`/entry/${eid}`);
      })
      .catch(e => {
        console.error(e);
      });
  }
  render() {
    const { editorState } = this.state;
    const style = {
      border: '1px solid grey',
      fontSize: '16px',
      minHeight: '400px',
      backgroundColor: 'aliceblue',
    };
    return (<div>
      <h3>Editor</h3>
      <div style={style}>
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>
      <Button bsStyle="link">Preview</Button>
      <Button bsStyle="link" onClick={this.discardHandler}>Discard</Button>
      <Button bsStyle="link" onClick={this.submitHandler}>Submit</Button>
    </div>);
  }
}
MyEditor.propTypes = {
  content: React.PropTypes.string,
  entryID: React.PropTypes.string,
  params: React.PropTypes.object,
};

export default withRouter(MyEditor);
