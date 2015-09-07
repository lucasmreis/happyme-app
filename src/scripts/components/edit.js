import React from 'react';
import Mori from 'mori';
import {go, put} from 'js-csp';

import EditViewSingle from './edit-view-single';
import EditEditingSingle from './edit-editing-single';
import EditAddSingle from './edit-add-single';

let {get, map, equals, toJs} = Mori;

export default class Edit extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !equals(this.props.appState, nextProps.appState);
  }

  renderSingle(sentence) {
    const channels = this.props.channels;
    const editing = get(sentence, 'editing');
    return editing ?
      <EditEditingSingle sentence={sentence} channels={channels} /> :
      <EditViewSingle    sentence={sentence} channels={channels} />;
  }

  startAdding() {
    const ch = this.props.channels.startAdding;
    go(function* () {
      return yield put(ch, true);
    });
  }

  renderAdding() {
    const adding = get(this.props.appState, 'adding');
    const channels = this.props.channels;
    return adding ?
      <EditAddSingle channels={channels} /> :
      <div className="single-sentence add-sentence" onTouchTap={this.startAdding.bind(this)}>+</div>;
  }

  render() {
    window.location.hash = '/edit';

    const sentences = get(this.props.appState, 'sentences');

    return <div className="container edit-container">
      {this.renderAdding()}
      {toJs(map(this.renderSingle.bind(this), sentences))}
    </div>;
  }
}