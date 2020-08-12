import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Landing from './Landing';
import Projects from './Projects';
import Footer from './Footer';
import Dialog from './Dialog';

ReactDOM.render(
  <>
    {/* <Landing />
    <Projects />
    <Footer /> */}
    <Dialog data={{
      role : "Software Developer",
      company : "Loft Orbital Inc.",
      link : "https://www.loftorbital.com",
      info : "https://www.medium.com/@baetia"
      }}/>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
