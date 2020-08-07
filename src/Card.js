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
      window.innerWidth < 450 ? tech.splice(2) : tech.splice(3) // Only keep the first 2 or 3 tags due to space

      let desc = data.description; // Only keep85 chars due to space
      desc.slice(85);

      return (
        <div className="card" onClick={() => window.location.href=data.link ? data.link : "javascript:void(0);"} style={{"cursor" : data.link ? "pointer" : "unset"}}>
          <img class="card-img-top" src={data.img ? data.img : placeholder} alt="Card image"></img>
          <div className="card-body">
            <h5 className="card-title">{data.role}</h5>
            <p className="card-text" id="company">{data.company}</p>
            <p className="card-text">{desc}</p>
          </div>
          <div className="card-footer">

              {/* <a href={data.link} className="footer-link" style={{"display" : data.link ? "inline-block" : "none"}}>
                <i class="material-icons" style={{"color":"white"}}>language</i> */}
              {/* </a> */}
              
              <a href={data.info} className="footer-link" style={{
                "opacity" : data.info ? "1" : "0",
                "cursor" : data.info ? "pointer" : "unset",
                }}>
                <i class="material-icons" style={{"color":"white"}}>info</i>
              </a>

              {
                tech.map( t=> <p className="footer-link tech">{t}</p>)
              }

            </div>
        </div>
      )
    }
}

export default Card;