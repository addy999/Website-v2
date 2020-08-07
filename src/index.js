import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Landing from './Landing';
import Projects from './Projects';
import Footer from './Footer';

ReactDOM.render(
  <React.StrictMode>
    <Landing />
    <Projects />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
