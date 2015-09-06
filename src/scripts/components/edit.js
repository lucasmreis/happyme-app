import React from 'react';

const str = m => JSON.stringify(Mori.toJs(m), null, '  ');

export default class Edit extends React.Component {
  render() {
    window.location.hash = '/edit';
    return <div>
      <h1>Edit</h1>
      <pre>{str(this.props.appState)}</pre>
    </div>;
  }
}