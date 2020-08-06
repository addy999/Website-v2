import React, {Component} from 'react';
import dp_pic from './assests/dp.jpg';
import './css/dp.css';

class Dp extends React.Component {

    constructor(props) {
      super(props);
    //   this.state = {
    //       ""
    //   }

    }



    render() {

        const dp_img = {
            'width': '25vw',
            'border': 'white',
            'border-radius': '1000px',
            'border-style': 'solid',
        };

        const placeholder = "https://via.placeholder.com/250";

        const before_transform_1 = {
            "transform" : "translate(-50px, -150px)"
        };
        const before_transform_2 = {
            "transform" : "translate(250px, -150px)"
        };
        const before_transform_3 = {
            "transform" : "translate(100px, 150px)"
        };

        return (
            <>

            {/* Overlay */}

            <div style={{
                "position" : "absolute",
                
                }}>
                <img style={before_transform_1} className="collage-img" src={placeholder}></img>
                <img style={before_transform_2} className="collage-img" src={placeholder}></img>
                <img style={before_transform_3} className="collage-img" src={placeholder}></img>                
            </div>


            <figure>
                <img style={dp_img} src={dp_pic} alt="dp"></img>
            </figure>

            </>
        );
    }
}

export default Dp;