import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import Root from './root'
import registry from './lib/registry';
import 'file?name=index.html!../example/index.html';
import './index.css';

// Create mount element dynamically
const el = document.createElement('div');
el.id = 'root';
document.body.appendChild(el);

render((
  <AppContainer>
    <Root />
  </AppContainer>
), el);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default;
    console.log(NextRoot);
    render((
      <AppContainer>
        <NextRoot />
      </AppContainer>
    ), el);
  });
}

window.CMS = {};
console.log('reg: ', registry);
for (const method in registry) {
  window.CMS[method] = registry[method];
}
window.createClass = React.createClass;
window.h = React.createElement;
