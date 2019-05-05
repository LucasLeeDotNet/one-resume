//React
import React, { Component, useState, useContext } from 'react';

//Component
import IntroComponent from './components/IntroComponent/IntroComponent';
import SkillsComponent from './components/SkillsComponent/SkillsComponent';
import HeaderComponent from './components/HeaderComponent/Header.component';
import ExperiencesComponent from './components/ExperiencesComponent/Experiences.component';
import GenericSnackbarComponent from './components/snackbars/GenericSnackbarComponent';

//Style
import './App.scss';
import { StoreContext } from './context/StoreContext';

export interface AppProps {}
const App = ( props: AppProps ) => {

  const { state, dispatch, actions } = useContext( StoreContext );

  /**
   * Readded toolbar clicking in the window after printout
   */
  const handlePrintModeClick = () => { 
    actions.handlePrintModeToggle( false );
  }

  return (
    <div className="App">
      <HeaderComponent />
      <div className="content-container" onClick={ handlePrintModeClick }>
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

export default App;
