import React from 'react';
import './css/card.css';
import placeholder from './assests/placeholder.png';

class Card extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {

      const {data} = this.props;
      let tech = data.tech.split(",");
      tech.splice(3); // Only keep the first 3 tags due to space

      return (
        <div className="card">
          <img class="card-img-top" src={data.img ? data.img : placeholder} alt="Card image"></img>
          <div className="card-body">
            <h5 className="card-title">{data.role}</h5>
            <p className="card-text" id="company">{data.company}</p>
          </div>
          <div className="card-footer">
              <a href={data.link} className="footer-link" style={{"display" : data.link ? "inline-block" : "none"}}><i class="material-icons" style={{"color":"white"}}>language</i></a>
              <a href={data.info} className="footer-link" style={{"display" : data.info ? "inline-block" : "none"}}><i class="material-icons" style={{"color":"white"}}>info</i></a>

              {
                tech.map( t=> <p className="tech">{t}</p>)
              }

            </div>
        </div>
      )
    }
}

export default Card;