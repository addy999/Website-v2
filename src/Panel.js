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
    if (this.props.place != 0){
      this.toggle();
    }
  }

  render() {

    const card_area_style = {
      "margin" : "5vh 5vw",
    }

    return (
      <div className="Panel">
        <div className="row">

          <div className="col" onClick={this.toggle} style={{'maxWidth': 'fit-content',}}>
            <h3 style={{"font-size" : this.state.width > 450 ? "xx-large" : "x-large"}} className="display-4" >
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

        <div className="card-group" style={card_area_style} ref={this.cardGroup}>
          {this.props.data.map( (e) => <Card data={e}/> )}
        </div>

      </div>
    );
  }
}

export default Panel;