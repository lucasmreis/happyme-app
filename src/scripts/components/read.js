import React from 'react';

const str = m => JSON.stringify(Mori.toJs(m), null, '  ');

export default class Read extends React.Component {
  render() {
    window.location.hash = '/read';
    return <div>
      <h1>Read</h1>
      <pre>{str(this.props.appState)}</pre>
    </div>;
  }
}