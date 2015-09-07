import Polyfill from 'babel/polyfill';
import Mori from 'mori';
import {chan, go, take, offer, put} from 'js-csp';

import * as Data from './data';
import {requestRender} from './render';

let {toClj, get} = Mori;

const loadApp = () => ({
  state: Data.fresh(),
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
        requestRender(app);
      }
    });
  });
}

const start = () => {
  let app = loadApp();
  window.app = app; // for testing
  initHistory(app);
  initUpdates(app);
  requestRender(app);
};

start();

window.offer = offer;
window.Mori = Mori;
