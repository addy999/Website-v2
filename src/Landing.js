import React from 'react';

import Dp from './dp';
import github from './assests/github.png';
import linkedin from './assests/linkedin.gif';
import email from './assests/email.png';

import './css/Landing.css';
import './css/stars2.css';

class Landing extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        mouseover : false,
      }
    }

    stars_visible = () => {
      return {
        "opacity" : this.state.mouseover ? 1 : 0,
        "transition" : "all 0.5s",
      }
    }

    render() {
      return (
        <div className="Landing">

        {/* Scrolling stars   */}

        {/* <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div> */}

        {/* Twinkling stars   */}

        <div className="stars" style={this.stars_visible()}></div>
        <div className="twinkling" style={this.stars_visible()}></div>

        <header className="header row">

          <div className="col">
            <Dp />
          </div>
          
          <div id="desc" className="col">
            <h1 className="display-4">
              Addy <span className="blue">Bhatia</span>
            </h1>
            <br></br>
            <p className="desc-text">Nice to see you, it's been a while.</p>
            <p className="desc-text bold blue">Full-stack and Software Dev.</p>
            <p className="desc-text">I code everything from <span className={this.state.mouseover ? "blue" : ""} onMouseEnter={() => this.setState({mouseover:true})} onMouseLeave={() => this.setState({mouseover:false})}>space tech</span> to ML pipelines.</p>
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
}

export default Landing;