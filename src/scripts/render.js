import React from 'react';

import Main from './components/main';

React.initializeTouchEvents(true);

let element = document.getElementById('happyme');

let isPending = false;

export const requestRender = app => {
  if (!isPending) {
    isPending = true;
    return window.requestAnimationFrame(() => {
      React.render(
        <Main appState={app.state} channels={app.channels} />,
        element);
      isPending = false;
    });
  }
};
