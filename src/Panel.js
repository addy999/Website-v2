import React, {Component, useReducer} from 'react';
import { findDOMNode } from 'react-dom';
import './css/Panel.css';
import Card from './Card';
import $ from 'jquery';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {checked : false};

    this.title_div_style = {
      'maxWidth': 'fit-content',
    }
    this.title_style = {
      "font-size" : "xx-large",
    }
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
          <div className="col" onClick={this.toggle} style={this.title_div_style}>
            <h3 style={this.title_style} className="display-4" ><span className="material-icons" id="plus">{this.state.checked ? "add" : "remove"}</span>{this.props.title}</h3>
          </div>
          <hr className="col" id="line"></hr>
        </div>
        <div className="card-group" style={card_area_style} ref={this.cardGroup}>
          {this.props.data.map( (e) => <Card data={e}/> )}
        </div>
      </div>
    );
  }
}

export default Panel;