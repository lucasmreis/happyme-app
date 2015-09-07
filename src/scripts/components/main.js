import React from 'react';
import Mori from 'mori';

import Read from './read';
import Edit from './edit';
import Home from './home';

let {get} = Mori;

export default class Main extends React.Component {
  render() {
    const state = this.props.appState;
    const screen = get(state, 'screen');
    if (screen === 'read') {
      return <Read appState={state} channels={this.props.channels} />
    } else if (screen === 'edit') {
      return <Edit appState={state} channels={this.props.channels} />
    } else {
      return <Home appState={state} channels={this.props.channels} />
    }
  }
}