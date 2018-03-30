import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import 'tachyons';

const particleOptions = {
  particles: {
    number: {
      value:30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

const app = new Clarifai.App({
 apiKey: 'c33b583f5c6d41ca8e15024419ca7f06'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height) 
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b", 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} route={this.state.route}/>
        { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
            </div>
          : (this.state.route === 'register'
            ? <Register />
            : <SignIn onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
