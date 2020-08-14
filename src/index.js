import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Landing from './Landing';
import Projects from './Projects';
import Footer from './Footer';
import Dialog from './Dialog';

const demoP = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Diam maecenas ultricies mi eget mauris pharetra. Elementum nisi quis eleifend quam adipiscing vitae proin.";

ReactDOM.render(
  <>
    {/* <Landing /> */}
    <Projects />
    {/* <Footer /> */}
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
