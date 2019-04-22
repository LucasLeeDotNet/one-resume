import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import IntroComponent from './components/IntroComponent/IntroComponent';
import SkillsComponent from './components/SkillsComponent/SkillsComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <div className="content-container">
          <div className="content">
            <IntroComponent/>
            <SkillsComponent skills={[{ name: 'Javascript', level: 8.5, preferred: 'high', icon: 'Js'}]}/> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
