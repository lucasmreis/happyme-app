import React from 'react';
import Mori from 'mori';
import {go, put} from 'js-csp';

let {get} = Mori;

export default class EditViewSingle extends React.Component {
  startEditing(id) {
    const ch = this.props.channels.startEditing;
    return () => go(function* () {
      return yield put(ch, id);
    });
  }

  render() {
    const text = get(this.props.sentence, 'text');
    const id = get(this.props.sentence, 'id');
    return <div className="single-sentence" onTouchTap={this.startEditing(id)}>
      {text}
    </div>
  }
}