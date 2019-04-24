//React
import React, { Component, useState, useContext } from 'react';

//Component
import IntroComponent from './components/IntroComponent/IntroComponent';
import SkillsComponent from './components/SkillsComponent/SkillsComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import ExperiencesComponent from './components/ExperiencesComponent/ExperiencesComponent';
import GenericSnackbarComponent from './components/snackbars/GenericSnackbarComponent';

//Style
import './App.scss';
import { StoreContext } from './context/StoreContext';

const App = ( props: any ) => {

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
