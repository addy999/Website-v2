import React from 'react';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Landing from './Landing';
import Projects from './Projects';
import Footer from './Footer';


class App extends React.Component {

    state = { width: 0, height: 0 };

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        // window.location.href="";
      };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return(
            <>
            <Landing/>
            <Projects/>
            <Footer/>
            </>
        )
    }
}

export default App;
