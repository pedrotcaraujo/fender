import React, { Component } from 'react';
import './style.css';
import RiffStation from '../RiffStation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fender RiffStation Challange</h1>
        </header>
        <div className="App-intro">    
          <RiffStation/>
        </div>
      </div>
    );
  }
}

export default App;
