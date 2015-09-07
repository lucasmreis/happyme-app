import React from 'react';
import Mori from 'mori';
import {go, put} from 'js-csp';

let {get} = Mori;

export default class EditEditingSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputText: get(props.sentence, 'text')};
  }

  handleChange(ev) {
    this.setState({inputText: ev.target.value});
  }

  detectEnter(id) {
    return (ev) => {
      const ENTER = 13;
      const ch = this.props.channels.edit;
      if (ev.keyCode === ENTER) {
        const text = this.state.inputText.trim();
        go(function* () {
          return yield put(ch, {id, text});
        });
      }
    }
  }

  render() {
    const id = get(this.props.sentence, 'id');
    const text = get(this.props.sentence, 'text');
    return <div className="editing-sentence">
      <textarea className="textarea-sentence"
                type="text"
                rows="4"
                value={this.state.inputText}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.detectEnter(id).bind(this)} />
    </div>
  }
}