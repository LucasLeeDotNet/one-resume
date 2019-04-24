//React
import React, { Component } from 'react';

//Component
import IntroComponent from './components/IntroComponent/IntroComponent';
import SkillsComponent from './components/SkillsComponent/SkillsComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import ExperiencesComponent from './components/ExperiencesComponent/ExperiencesComponent';
import GenericSnackbarComponent from './components/snackbars/GenericSnackbarComponent';

//Style
import './App.scss';


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
        <GenericSnackbarComponent/>
      </div>
    );
  }
}

export default App;
