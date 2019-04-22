import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import IntroComponent from './components/IntroComponent/IntroComponent';
import SkillsComponent from './components/SkillsComponent/SkillsComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import ExperiencesComponent from './components/ExperiencesComponent/ExperiencesComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <div className="content-container">
          <div className="content">
            <IntroComponent/>
            <SkillsComponent/>
            <ExperiencesComponent/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
