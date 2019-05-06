// Context
import { types } from "./reducers";

// Model
import SkillModel from "../models/SkillModel";
import IStateModel from "../models/StateModel";

// Utility
import uuid from "uuid/v4";
import ExperienceModel from "../models/ExperienceModel";
declare const html2pdf: Function;

export const useActions = (state: IStateModel, dispatch: Function) => {

  /**
   * Search and deletes a experience with the associated id
   */
  function deleteExperience( id: string ) {

    const newExperiences = state.experiences.filter( ( experience: ExperienceModel ) => {
      return experience.id !== id;
    } );

    dispatch( {
        type: types.UPDATE_EXPERIENCE,
        experiences: newExperiences,
    } );
  }


  /**
   * Search and deletes a skill with the associated id
   */
  function deleteSkill( id: string ) {

    const newSkills = state.skills.filter( ( experience: SkillModel ) => {
      return experience.id !== id;
    } );

    dispatch( {
        type: types.UPDATE_SKILL,
        skills: newSkills,
    } );
  }


  /**
   * Hides toolbar for print, clicking on the toolback again should return the page to its initial state
   */
  const handlePrintModeToggle = ( printMode: boolean ) => {
    if ( !printMode ) {
      dispatch( {
        type: types.TOGGLE_PRINT,
        printMode: false,
      } );
      // Adjust the margin for print
      const $content: HTMLElement|null = document.querySelector( ".content" );
      $content && ( $content.style.margin = "initial" );
    } else {
      dispatch( {
        type: types.TOGGLE_PRINT,
        printMode: true,
      } );
      // Adjust the margin for print
      const $content: HTMLElement|null = document.querySelector( ".content" );
      $content && ( $content.style.margin = "-4rem" );
      snackbar( "Click anywhere on the screen to turn off print mode" );
    }

  };


  /**
   * Prints the resume to pdf, has display issues
   */
  const handlePrintPdf = () => {

    // Hide the SVG icons that cannot be render correctly
    document.querySelectorAll( ".skill-icon" ).forEach( (icon: any) => {
      icon.style.display = "none";
    } );

    // Move the margin up to remove the empty space for the pdf
    const $content: HTMLElement|null = document.querySelector( ".content" );
    $content && ($content.style.margin = "-50px 0 0" );

    html2pdf( document.querySelector( ".content"), {
      margin: 0.4,
      filename: `Resume.pdf`,
      image: {
        type: "jpeg",
        quality: 0.90,
      },
      enableLinks: false,
      html2canvas: {
        onrendered( ) {
          // Return the svg icons after pdf generation
          document.querySelectorAll( ".skill-icon" ).forEach( (icon: any) => {
            icon.style.display = "initial";
          } );

          // Return the top margin after pdf generation
          const $content: HTMLElement|null = document.querySelector( ".content" );
          $content && ( $content.style.margin = "initial" );
        },
        dpi: 600,
        letterRendering: false,
        width: 730,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    });
  };


  /**
   * Search and updates an existing experience or creates a new experience if the id is 'new'
   */
  function updateExperience( experience: ExperienceModel, selectedExperience?: string ) {
    let newExperiences;
    // Special handler for new experience
    if ( experience.id === "new") {
      newExperiences = [
        ...state.experiences,
        {
          ...experience,
          id: uuid(),
        },
      ];
    } else {
      newExperiences = state.experiences.reduce( ( result: ExperienceModel[], _experience: ExperienceModel ) => {
        const updateExperience: ExperienceModel =  (_experience.id === experience.id ) ? experience : _experience;
        return [
          ...result,
          updateExperience,
        ];
      }, [] );
    }
    dispatch( {
      type: types.UPDATE_EXPERIENCE,
      experiences: newExperiences,
      selectedExperience: selectedExperience || undefined,
    } );
  }


  /**
   * Search and updates an existing skill or creates a new skill if the id is 'new'
   */
  function updateSkill( skill: SkillModel ) {
    let newSkills;
    // Special handler for new skill
    if ( skill.id === "new") {
      newSkills = [
        ...state.skills,
        {
          ...skill,
          id: uuid(),
        },
      ];
    } else {
      newSkills = state.skills.reduce( ( result: SkillModel[], _skill: SkillModel ) => {
        const updateSkill: SkillModel =  (_skill.id === skill.id ) ? skill : _skill;
        return [
          ...result,
          updateSkill,
        ];
      }, [] );
    }
    dispatch( {
      skills: newSkills,
      type: types.UPDATE_SKILL,
    } );
  }


  /**
   * Utility function to generate generic snackbar
   */
  function snackbar( message: string, hideDuration?: number) {
    dispatch( {
      hideDuration,
      message,
      type: types.SHOW_GENERIC_SNACKBAR,
    } );
  }

  return {
    deleteExperience,
    deleteSkill,
    handlePrintModeToggle,
    handlePrintPdf,
    snackbar,
    updateExperience,
    updateSkill,
  };
};
