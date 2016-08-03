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
    this.fetchData();
  }
  fetchData() {
    const eID = this.props.entryID || this.props.params.entryID;
    const uri = `/data/${eID}.txt`;
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
  }
  discardHandler() {
    this.props.router.push(`/entry/${this.props.params.entryID}`);
  }
  submitHandler() {
    const text = this.state.editorState.getCurrentContent().getPlainText();
    console.log(text);
    const API_HOST = 'http://localhost:9292';
    const postURI = `${API_HOST}/entry`;

    const title = text.split(/\r?\n/)[0];
    const content = text.split(/\r?\n/).splice(1).join('\n');
    const summary = content.substr(0, 100);
    const author = 'test';
    const tags = ['test'];
    const body = { title, content, summary, author, tags };

    const postOptions = {
      method: 'POST',
      body,
    };
    fetch(postURI, postOptions)
      .then((res) => {
        console.log(res);
        alert('submit');
        this.props.router.push(`/entry/${this.props.params.entryID}`);
      })
      .catch(e => {
        throw new Error(e);
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
