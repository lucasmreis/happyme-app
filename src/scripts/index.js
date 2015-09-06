import Polyfill from 'babel/polyfill';
import Mori from 'mori';
import {chan, go, take, offer, put} from 'js-csp';

import * as Data from './data';
import {requestRender} from './render';

let {toClj} = Mori;

const loadApp = () => ({
  state: Data.fresh(),
  channels: {
    nav: chan(),
    view: chan(),
    add: chan(),
    remove: chan(),
    edit: chan(),
  },
  consumers: {
    nav: Data.goTo,
    view: Data.view,
    add: Data.add,
    remove: Data.remove,
    edit: Data.edit,
  }
});

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
  initUpdates(app);
  requestRender(app);
};

start();

window.testIt = () => {
  let app = window.app;
  go(function* () {
    let i = 0;
    yield put(app.channels.remove, {});
    for (i = 0; i < 200; i++) {
      yield put(app.channels.add, 'uuuuu');
    }
    yield put(app.channels.remove, {});
  });
}
