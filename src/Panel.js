import React, {Component, useReducer} from 'react';
import { findDOMNode } from 'react-dom';
import Card from './Card';
import $ from 'jquery';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked : false, 
      width: window.innerWidth
    };

    this.cardGroup = React.createRef();
  }

  toggle = () => {
    this.setState({
      checked : !this.state.checked
    });
    $(findDOMNode(this.cardGroup.current)).toggle(150, "swing");
  }

  componentDidMount() {
    // if (this.props.place != 0){
      // this.toggle();
    // }
  }

  render() {

    const card_area_style = {
      "margin" : "5vh 5vw",
    }

    var arrayOfData = [this.props.data];
    if(425 < window.innerWidth && window.innerWidth < 1030) {
      var size = 2;
      arrayOfData = [];
      for (var i=0; i<this.props.data.length; i+=size) {
          arrayOfData.push(this.props.data.slice(i, i+size));
      }
    }

    return (
      <div className="Panel" style={this.props.style}>
        <div className="row">

          <div className="col" onClick={this.toggle} style={{'maxWidth': 'fit-content', "cursor" : "pointer"}}>
            <h3 style={{"fontSize" : this.state.width > 450 ? "xx-large" : "x-large"}} className="display-4" >
              <span style={{ 
              "margin" : 'auto 10px auto 10px',
              'transform':  this.state.width < 450 ? 'translateY(20%)' : "",
              }} className="material-icons">{this.state.checked ? "add" : "remove"}</span>{this.props.title}</h3>
          </div>
          
          <hr className="col" style={{
            'maxWidth': '100%',
            'backgroundColor': 'white',
            'margin': this.state.width > 450 ? 'auto 3vw auto 0' : 'auto 6vw auto 0',
          }}></hr>
        </div>
          
        <div style={card_area_style} ref={this.cardGroup}>
          {arrayOfData.map( 
            (data) =>  {return <div className="card-group">
                                {data.map( (e) => <Card data={e}/> )}
                              </div>
            }
          )}
         
        </div>

      </div>
    );
  }
}

export default Panel;