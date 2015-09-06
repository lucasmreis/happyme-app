import React from 'react';
import Mori from 'mori';

const str = m => JSON.stringify(Mori.toJs(m), null, '  ');

export default class Main extends React.Component {
  render() {
    return <pre>{str(this.props.appState)}</pre>;
  }
}