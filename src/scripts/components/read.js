import React from 'react';
import Mori from 'mori';

let {get, nth} = Mori;

const str = m => JSON.stringify(Mori.toJs(m), null, '  ');

export default class Read extends React.Component {
  current() {
    const state = this.props.appState;
    const currentIndex = get(state, 'currentSentence');
    const sentences = get(state, 'sentences');
    const currentSentence = nth(sentences, currentIndex);
    return get(currentSentence, 'text');
  }

  render() {
    window.location.hash = '/read';
    return <div className="container read-container">
      <div className="happy-sentence">{this.current()}</div>
    </div>;
  }
}