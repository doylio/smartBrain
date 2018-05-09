import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
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
      file: '',
      urlInput: '',
      imageUrl: '',
      boxes: [],
      loaded: true,
      errorMessage: "",
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(box => { 
      return box.region_info.bounding_box 
    });
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map(box => {
      return {
        leftCol:box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height) 
      }
    });
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onLocalInputChange = (file) => {
    this.setState({
      file,
      urlInput: '',
      errorMessage: ""
    });
  }

  onButtonSubmit = () => {
    let data;
    if(this.state.urlInput) {
      this.setState({imageUrl:this.state.urlInput});
      data = this.state.urlInput;
    }
    if(this.state.file) {
      const imageFile = document.querySelector("#local-input").files[0];
      this.setState({imageUrl: URL.createObjectURL(imageFile)});
      data = this.state.file;
    }
    
    if(data) {
      this.setState({loaded: false});
      app.models
        .predict(
          "a403429f2ddf4b49b307e318f00e528b", 
          data)
        .then(response => this.calculateFaceLocation(response))
        .then(boxes => {
          this.setState({loaded: true});
          this.displayFaceBox(boxes);
        })
        .catch(err => {
          console.log("ERROR:", err);
          if(err.status === 401) {
            this.setState({errorMessage: "Error:  Unable to connect to Clarifai servers"});
          } else if (err.status === 400) {
            this.setState({errorMessage: "Error:  Input image invalid"});
          } else {
            this.setState({errorMessage: "Error:  Something went wrong"});
          }

        });
    }
  }

  onUrlInputChange = (value) => {
    this.setState({
      urlInput: value,
      file: '',
      errorMessage: ""
    });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}/>
          <div>
            <Logo />
            <ImageLinkForm 
              onUrlInputChange={this.onUrlInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
              onLocalInputChange={this.onLocalInputChange}
              errorMessage={this.state.errorMessage}
            />
            <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} loaded={this.state.loaded}/> 
          </div>
      </div>
    );
  }
}

export default App;
