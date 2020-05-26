import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Faceform from './components/Faceform/Faceform';
import Ranking from './components/Ranking/Ranking';
import Imagerecog from './components/Imagerecog/Imagerecog'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'


const app = new Clarifai.App({
  apiKey: 'cca7b14dc781440b9805d24d51d258a0'
 });

const paramOptions =
  {
    particles:{
      number:{
        value: 100,
        density:{
          enable: true,
          value_area: 800
        }
      }
    }
}

class App extends Component {

  constructor(){
    super();
    this.state ={
      input: '',
      imageUrl:'',
      faceBox: '',
      route: 'signin',
      isSignedIn: false,
      user: {

        id: '',

        name: '',

        email: '',

        entries: 0,

        joined: ''

      }
    }
  }

  loadUser = (data) => {

    this.setState({user: {

      id: data.id,

      name: data.name,

      email: data.email,

      entries: data.entries,

      joined: data.joined

    }})

  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  faceboxCalculation = (data) =>{
      
      const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
      console.log(boundingBox);     
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height)
      }
  }


  displayFaceBox = (box) =>{
    this.setState({faceBox: box});
  }

  onSubmit = () =>{
    
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    (response) =>{
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.user.email
          })
        }).then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
     this.displayFaceBox(this.faceboxCalculation(response));
    },
    (err) =>{
      console.log("mara");
     console.log(err);
    }
  );
  }

  onRouteChange = (route) =>{
    this.setState({route: route});
  }

  OnSignedIn = (status) =>{

    this.setState({isSignedIn: status});
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles"
                  params={paramOptions} />
        <Navigation onRouteChange = {this.onRouteChange} routeStatus={this.state.route} isSignedIn={this.state.isSignedIn} OnSignedIn={this.OnSignedIn}/>
        { this.state.route === 'Home'
        ?
        <React.Fragment>
        <Logo />
        <Ranking name={this.state.user.name} entries={this.state.user.entries} />
        <Faceform onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
        <Imagerecog imageUrl={this.state.imageUrl} faceBox={this.state.faceBox}/>
        </React.Fragment>
        :(this.state.route === 'signin')?
        <Signin onRouteChange={this.onRouteChange} OnSignedIn={this.OnSignedIn} loadUser={this.loadUser} />
        :<Signup onRouteChange={this.onRouteChange} OnSignedIn={this.OnSignedIn} loadUser={this.loadUser} />
        
        }
       
        
        
      </div>
    );
  }
  
}

export default App;
