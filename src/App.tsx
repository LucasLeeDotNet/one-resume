// React
import React, { useContext } from "react";

// Component
import ExperiencesComponent from "./components/ExperiencesComponent/Experiences.component";
import HeaderComponent from "./components/HeaderComponent/Header.component";
import IntroComponent from "./components/IntroComponent/Intro.component";
import SkillsComponent from "./components/SkillsComponent/Skills.component";
import GenericSnackbarComponent from "./components/snackbars/GenericSnackbar.component";

// Style
import "./App.scss";
import { StoreContext } from "./context/StoreContext";

const App = ( ) => {

  const { actions } = useContext( StoreContext );

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
};

export default App;
