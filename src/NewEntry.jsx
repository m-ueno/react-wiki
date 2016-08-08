import React, { Component } from 'react';
import DraftEditor from './DraftEditor.jsx';

class NewEntry extends Component {
  render() {
    return (<div>
      <h2>New entry</h2>
      <DraftEditor entryID="0" />
    </div>);
  }
}

NewEntry.propTypes = {
};

export default NewEntry;
