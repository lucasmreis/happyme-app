import React from 'react';
import Mori from 'mori';
import {go, put} from 'js-csp';

let {get, nth} = Mori;

export default class Read extends React.Component {
  current() {
    const state = this.props.appState;
    const currentIndex = get(state, 'currentSentence');
    const sentences = get(state, 'sentences');
    const currentSentence = nth(sentences, currentIndex);
    return get(currentSentence, 'text');
  }

  view(which) {
    const ch = this.props.channels.view;
    return () => go(function* () {
      return yield put(ch, which);
    });
  }

  render() {
    window.location.hash = '/read';
    return <div className="container read-container" onTouchTap={this.view('next')}>
      <div className="happy-sentence">{this.current()}</div>
    </div>;
  }
}