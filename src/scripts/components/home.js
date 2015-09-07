import React from 'react';
import {go, put} from 'js-csp';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
      <div className="btn-half btn-happy"
           onTouchTap={this.goTo('edit')}>
        <div className="label-half label-happy">Happy?</div>
      </div>
      <div className="btn-half btn-not-happy"
           onTouchTap={this.goTo('read')}>
        <div className="label-half label-not-happy">Not happy?</div>
      </div>
    </div>;
  }
}