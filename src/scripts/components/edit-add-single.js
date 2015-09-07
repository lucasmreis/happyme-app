import React from 'react';
import Mori from 'mori';
import {go, put} from 'js-csp';

let {get} = Mori;

export default class EditAddSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputText: ''};
  }

  handleChange(ev) {
    this.setState({inputText: ev.target.value});
  }

  detectEnter(ev) {
    const ENTER = 13;
    const ch = this.props.channels.add;
    if (ev.keyCode === ENTER) {
      const text = this.state.inputText.trim();
      if (text !== '') {
        go(function* () {
          return yield put(ch, text);
        });
      }
    }
  }

  render() {
    return <div className="editing-sentence">
      <textarea className="textarea-sentence"
                type="text"
                rows="4"
                value={this.state.inputText}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.detectEnter.bind(this)} />
    </div>
  }
}