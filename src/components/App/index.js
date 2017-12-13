import React, { Component } from 'react';
import './style.css';
import Player from '../Player';
import Timeline from '../Timeline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fender RiffStation Challange</h1>
        </header>
        <div className="App-intro">
          <Player videoId='oKsxPW6i3pM'/>
          <Timeline/>          
        </div>
      </div>
    );
  }
}

export default App;
