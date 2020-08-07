import React from 'react';
import Panel from './Panel';
import Tabletop from 'tabletop'

class Projects extends React.Component {

    constructor(props) {
      super(props);
      this.state ={
        data : [],
        width: window.innerWidth
      }
    }

    componentDidMount() {
      Tabletop.init({
        key: '1BDfy3CbgAX5d0FyyHQUKfYmCawTE6eVQdUTZ1G2qOLE',
        callback: googleData => {
          this.setState({
            data: googleData
          });
          this.parseData();
          this.setState({loaded : true});
        },
        simpleSheet: true
      })
    }

    parseData = () => {

      // Get all the types of work first
      this.setState({
        types : [...new Set(this.state.data.map((row) => row.type))]
      });

      // Next, let's separate by type
      let empty = this.state.types.reduce((acc, t) => {
        acc[t] = []
        return acc}, {});

      this.setState({
        projects : this.state.data.reduce((acc, row) => {
          acc[row.type].push(row);
          return acc
        }, empty)
      });

    }
  
    render() {

      const style = {
            "padding": "3vw 3vw 5rem",
            "position" : "relative",
            "background": "radial-gradient(ellipse at bottom, #12181a 0%, #090a0f 100%)",
            "color": "white",
            "min-height" : "100vh"
      }

      if (this.state.loaded) {

        return (
          <div className="Projects section" style={style}>
              
              <h1 className="blue display-4" style={{
                "padding":"10px",
                "fontSize" : this.state.width < 450 ? "3rem" : "",
                }}>
                  Projects
              </h1>

              <br></br>

              {
                this.state.types.map((type, index) => <Panel title={type} style={{"padding" : "0 0 2vh 0"}} data={this.state.projects[type]} place={index}/>)
              }

          </div>
        )
      }
      else {
        return null;
      }
    }
  }
  
export default Projects;