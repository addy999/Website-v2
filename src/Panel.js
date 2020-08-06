import React, {Component, useReducer} from 'react';
import './css/Panel.css';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {checked : false};

    this.title_div_style = {
      'max-width': 'fit-content',
    }
    this.title_style = {
      // "font-size" : "32px",
    }
  }

  toggle = () => {
    this.setState({
      checked : !this.state.checked
    });
  }

  render() {
    return (
      <div className="Panel">
        <div className="row">
          <div className="col" onClick={this.toggle} style={this.title_div_style}>
            <h4 style={this.title_style}><span className="material-icons" id="plus">{!this.state.checked ? "add" : "remove"}</span>{this.props.title}</h4>
          </div>
          <hr className="col" id="line"></hr>
        </div>
      </div>
    );
  }
}

export default Panel;