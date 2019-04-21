import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import IntroComponent from './components/IntroComponent/IntroComponent';
import SkillsComponent from './components/SkillsComponent/SkillsComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';

const statement = `
Passionate about Javascript, specialize in rapid development with a design flair. Experienced with a wide range of skillset that extends from frontend to containerized devops and AWS. Lead frontend development on a new marketing platform for EAB.
`;
class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <div className="content-container">
          <div className="content">
            <IntroComponent name="Lucas Lee" position="Senior Web Developer" statement={statement}/>
            <SkillsComponent skills={[{ name: 'Javascript', level: 8.5, preferred: 'high', icon: 'Js'}]}/> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
