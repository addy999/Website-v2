import React from 'react';

import dp_pic from './assests/dp.jpg';
import grad from './assests/grad.png';
import teaching from './assests/teaching.jpg';
import loft from './assests/loft.jpg';

class Dp extends React.Component {

    constructor(props) {
      super(props);

      this.state = {mouseover : false};

      this.base_collage_style = {
          "position" : "absolute",
          "borderRadius" : "1000px",
          "transition": "all 0.5s ease-in-out",
          "zIndex" : "5",
          "width" : "250px",
          "height" : "250px",
          "border" : "#96FFF2",
          'borderStyle' : 'solid',

      };

      this.before_transform = {
              "top" : "50%",
              "left" : "50%",
              "transform" : "translate(-50%, -50%)",
              "opacity" : 0,
       };

      this.after_transform = [
          {
              "top" : "-15%",
              "left" : "50%",
              "transform" : "translateX(-50%)",
              "opacity" : 1,
          }, 
          {
            "top" : "55%",
            "left" : "0%",
            "opacity" : 1,
        }, 
        {
            "top" : "55%",
            "right" : "0%",
            "opacity" : 1,
      }];

      this.dp_img_style = {
          'width': '25vw',
          'border': 'white',
          'borderRadius': '1000px',
          'borderStyle': 'solid',
          "transition": "all 0.5s ease-in-out",
          "zIndex" : "0",
          "position" : "relative"
        };
    }

    get_collage_style = (i) => {     
        if(this.state.mouseover){
            var style = { ...this.base_collage_style, ...this.after_transform[i] };  
        }
        else {
            var style = { ...this.base_collage_style, ...this.before_transform };  
        }
        return style;
    }

    get_dp_style = () => {     
        if(this.state.mouseover){
            var style = { ...this.dp_img_style, ...{"filter" : "brightness(20%)"} };  
        }
        else {
            var style = { ...this.dp_img_style, ...{"filter" : "brightness(100%)"} };  
        }
        return style;
    }

    render() {

        const placeholder = "https://via.placeholder.com/250";

        return (
            <figure style={{"width": "fit-content", "margin": "auto"}} onMouseEnter={() => this.setState({mouseover:true})} onMouseLeave={() => this.setState({mouseover:false})}>

                {/* Collage overlay */}
                <img style={this.get_collage_style(0)} src={grad}></img>
                <img style={this.get_collage_style(1)} src={loft}></img>
                <img style={this.get_collage_style(2)} src={teaching}></img> 

                {/* Actual DP */}
                <img style={this.get_dp_style()} src={dp_pic} alt="dp"></img>

            </figure>
        );
    }
}

export default Dp;