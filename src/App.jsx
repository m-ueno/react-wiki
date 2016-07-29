import React from 'react';

export default class App extends React.Component {
  render() {
    return (<div>
      <p>React wiki</p>
    </div>);
  }
}
App.propTypes = { children: React.PropTypes.object };
