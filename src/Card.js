import React from 'react';
import './css/card.css';
import placeholder from './assests/placeholder.png';
import moment from 'moment/moment';
import Vote from './vote';

class Card extends React.Component {

    constructor(props) {
      super(props);
      this.card_id = React.createRef();
    }

    render() {

      const {data} = this.props;

      let tech = data.tech.split(",");
      window.innerWidth < 450 ? tech.splice(2) : tech.splice(3) // Only keep the first 2 or 3 tags due to space

      let desc = data.description; 
      
      // Parse date string
      if (!data.end){
        var date = moment(data.start).format("MMM YYYY") + "- Present";
      }
      else {
        var date = moment(data.start).format("MMM YYYY") + "-" + moment(data.end).format("MMM YYYY");
      }

      return (
        <>
        <div className="card" 
        style={{"cursor" : data.link ? "pointer" : "unset"}}
        onMouseEnter={()=>this.card_id.current.style.opacity=0.8}
        onMouseLeave={()=>this.card_id.current.style.opacity=0}>
          <div className="overlay" ref={this.card_id} style={{"display" : window.innerWidth > 450 ? "block" : "none"}}>
            <p className="tag">{data.tag}</p>
            <Vote id={data.id} />
          </div>
          <img className="card-img-top" src={data.img ? data.img : placeholder} alt="Card image" 
          style={{"cursor" : "unset"}}></img>
          {/* onClick={() => window.location.href = data.link && window.innerWidth > 450 ? data.link : "javascript:void(0);"}>
          </img> */}
          <div className="card-body" onClick={() => window.location.href = data.link ? data.link : "javascript:void(0);"} >
            <h5 className="card-title">{data.role}</h5>
            <p className="card-text" id="company">{data.company}<span style={{"float":"right"}}>{date}</span></p>
            <p className="card-text">{desc}</p>
          </div>
          <div className="card-footer" onClick={() => window.location.href = data.link ? data.link : "javascript:void(0);"} >

              {/* <a href={data.link} className="footer-link" style={{"display" : data.link ? "inline-block" : "none"}}>
                <i className="material-icons" style={{"color":"white"}}>language</i> */}
              {/* </a> */}
              
              <a href={data.info} className="footer-link" style={{
                "opacity" : data.info ? "1" : "0",
                "cursor" : data.info ? "default!important" : "default!important",
                }}>
                <i className="material-icons" style={{"color":"white"}}>info</i>
              </a>

              {
                tech.map( t=> <p className="footer-link tech">{t}</p>)
              }

            </div>
        </div>
        {window.innerWidth < 450 ? <Vote id={data.id} /> : ""}
        </>
      )
    }
}

export default Card;