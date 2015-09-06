import React from 'react';
import {go, put} from 'js-csp';

const str = m => JSON.stringify(Mori.toJs(m), null, '  ');

export default class Home extends React.Component {
  goTo(screen) {
    const ch = this.props.channels.nav;
    return () => go(function* () {
      return yield put(ch, screen);
    });
  }

  render() {
    window.location.hash = '/home';
    return <div className="container">
      <div className="btn-half btn-happy" onClick={this.goTo('edit')}>
        <div className="label-half label-happy">Happy?</div>
      </div>
      <div className="btn-half btn-not-happy" onClick={this.goTo('read')}>
        <div className="label-half label-not-happy">Not happy?</div>
      </div>
    </div>;
  }
}