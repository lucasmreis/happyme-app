import React from 'react';
import Mori from 'mori';

import EditViewSingle from './edit-view-single';
import EditEditingSingle from './edit-editing-single';

let {get, map, equals, toJs} = Mori;

export default class Edit extends React.Component {
  shouldComponentUpdate(nextProps) {
    const sentences = get(this.props.appState, 'sentences');
    const nextSentences = get(nextProps.appState, 'sentences');
    return !equals(sentences, nextSentences);
  }

  renderSingle(sentence) {
    const channels = this.props.channels;
    const editing = get(sentence, 'editing');
    return editing ?
      <EditEditingSingle sentence={sentence} channels={channels} /> :
      <EditViewSingle    sentence={sentence} channels={channels} />;
  }

  render() {
    window.location.hash = '/edit';

    const sentences = get(this.props.appState, 'sentences');

    return <div className="container edit-container">
      <div className="single-sentence add-sentence">+</div>
      {toJs(map(this.renderSingle.bind(this), sentences))}
    </div>;
  }
}