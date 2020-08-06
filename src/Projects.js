import React, {Component} from 'react';
import Panel from './Panel';

class Projects extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {

        const style = {
            "padding": "5vh 2vw 5rem 2vw",
            "position" : "relative",
            "background": "radial-gradient(ellipse at bottom, #12181a 0%, #090a0f 100%)",
            "color": "white",
        }


      return (
        <div className="Projects" style={style}>
            
            <h1 className="blue">
                Projects
            </h1>

            <br></br>

            {this.props.panels.map(
              title => <Panel title={title} />
            )}          
        </div>
      );
    }
  }
  
  export default Projects;