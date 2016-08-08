import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './src/App.jsx';
import DraftEditor from './src/DraftEditor.jsx';
import Entry from './src/Entry.jsx';
import NewEntry from './src/NewEntry.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="new" component={NewEntry} />
      <Route path="/entry/:entryID" component={Entry}>
        <Route path="edit" component={DraftEditor} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
