import Polyfill from 'babel/polyfill';
import Mori from 'mori';
import {chan, go, take, offer, put, putAsync, buffers} from 'js-csp';
import React from 'react';
React.initializeTouchEvents(true);

import * as Data from './data';
import Main from './components/main';

let {toClj, get} = Mori;

const loadApp = () => ({
  state: Data.fresh(),
  renderCh: chan(buffers.sliding(1)),
  channels: {
    nav: chan(),
    view: chan(),
    startAdding: chan(),
    add: chan(),
    remove: chan(),
    startEditing: chan(),
    edit: chan(),
  },
  consumers: {
    nav: Data.goTo,
    view: Data.view,
    startAdding: Data.startAdding,
    add: Data.add,
    remove: Data.remove,
    startEditing: Data.startEditing,
    edit: Data.edit,
  }
});

const initHistory = app => {
  // hash changes => nav channel
  window.addEventListener('hashchange', () => {
    const screen = window.location.hash.slice(2);
    const current = get(app.state, 'screen');
    if (screen !== current) {
      go(function* () {
        return yield put(app.channels.nav, screen);
      });
    }
  });
}

const initUpdates = app => {
  Object.keys(app.consumers).forEach(k => {
    const updateFn = app.consumers[k];
    const ch = app.channels[k];
    go(function* () {
      while (true) {
        const value = yield take(ch);
        console.log(`On channel [ ${k} ] received value [ ${JSON.stringify(value)} ]`);
        app.state = updateFn(app.state, value);
        yield put(app.renderCh, app.state);
      }
    });
  });
}

const initRender = (app, element) => {
  putAsync(app.renderCh, app.state);

  go(function* () {
    while(true) {
      const state = yield take(app.renderCh);
      const finishRender = chan();
      window.finishRender = finishRender;
      React.render(
      //window.requestAnimationFrame(() => React.render(
        <Main appState={app.state} channels={app.channels} />,
        element,
        () => window.requestAnimationFrame(() => putAsync(finishRender, {})));
      yield take(finishRender);
    }
  });
};

const start = () => {
  let app = loadApp();
  window.app = app; // for testing
  initHistory(app);
  initUpdates(app);
  initRender(app, document.getElementById('happyme'));
};

start();

window.start = start;
window.offer = offer;
window.Mori = Mori;
window.csp = require('js-csp');