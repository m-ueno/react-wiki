import React, { Component } from 'react';
import EntryEditor from './EntryEditor.jsx';

class NewEntry extends Component {
  render() {
    return (<div>
      <h2>New entry</h2>
      <EntryEditor entryID="0" />
    </div>);
  }
}

NewEntry.propTypes = {
};

export default NewEntry;
