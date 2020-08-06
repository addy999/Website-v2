import React from 'react';

import dp from './assests/dp.jpg';
import github from './assests/github.png';
import linkedin from './assests/linkedin.gif';
import email from './assests/email.png';

import './css/Landing.css';
import './css/stars.css';

function Landing({stars}) {

  const stars_visible = {
    "display" : stars ? "block" : "None",
    "opacity" : 0.5,
  }

  return (

    <div className="Landing">

      <div id='stars' style={stars_visible}></div>
      <div id='stars2' style={stars_visible}></div>
      <div id='stars3' style={stars_visible}></div>

      <header className="header row">

        <figure id="dp" className="col">
          <img id="dp-img" src={dp} alt="dp"></img>
        </figure>
        <div id="desc" className="col">
          <h1 className="display-4">
            Addy <span className="blue">Bhatia</span>
          </h1>
          <br></br>
          <p className="desc-text">Nice to see you, it's been a while.</p>
          <p className="desc-text bold blue">Full-stack and Software Dev.</p>
          <p className="desc-text">I code everything from space tech to ML pipelines.</p>
          <p className="desc-text">Explore my projects and give a shout.</p>

          <br></br>

          <div className="row butt">

            <button type="button" className="btn btn-outline-dark col-sm">
              <img className="contact-img" src={github}></img>
            </button>

            <button type="button" className="btn btn-outline-primary col-sm">
              <img className="contact-img" src={linkedin}></img>
            </button>

            <button type="button" className="btn btn-outline-info col-sm">
            <img className="contact-img" src={email}></img>
            </button>

          </div>
        </div>

      </header>
    </div>
  );
}

export default Landing;