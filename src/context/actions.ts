//Context
import { types } from "./reducers";

//Model
import SkillModel from "../models/SkillModel";
import { StateModel } from "./initialState";

//Utility
import uuid from 'uuid/v4';
declare const html2pdf: Function;

export const useActions = (state:StateModel, dispatch: Function) => {

  /**
   * Hides toolbar for print, clicking on the toolback again should return the page to its initial state
   */
  const handlePrintModeToggle = ( printMode: boolean ) => { 
    if ( !printMode ){ 
      dispatch( { 
        type: types.TOGGLE_PRINT,
        printMode: false
      } )
      //Adjust the margin for print
      const $content:any = document.querySelector( ".content" );
      $content.style.margin = 'initial';
    } else { 
      dispatch( { 
        type: types.TOGGLE_PRINT,
        printMode: true
      } )
      //Adjust the margin for print
      const $content:any = document.querySelector( ".content" );
      $content.style.margin = '-4rem';
    }

  }


  /**
   * Prints the resume to pdf, has display issues
   */
  const handlePrintPdf = () =>{ 
    
    //Hide the SVG icons that cannot be render correctly
    document.querySelectorAll( ".skill-icon" ).forEach( (icon:any) => { 
      icon.style.display = 'none';
    } );

    //Move the margin up to remove the empty space for the pdf
    const $content:any = document.querySelector( ".content" );
    $content.style.margin = '-50px 0 0';

    html2pdf( document.querySelector( '.content'), {
      margin: 0.4,
      filename: `Resume.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.90
      },
      enableLinks: false,
      html2canvas: {
        onrendered: function ( ){ 
          //Return the svg icons after pdf generation
          document.querySelectorAll( ".skill-icon" ).forEach( (icon:any) => { 
            icon.style.display = 'initial';
          } );

          //Return the top margin after pdf generation
          const $content:any = document.querySelector( ".content" );
          $content.style.margin = 'initial';
        },
        dpi: 600,
        letterRendering: false,
        width: 730,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    });
  }



  /**
   * Search and updates an existing skill or creates a new skill if the id is 'new'
   */
  function updateSkill( skill: SkillModel ){ 
    let newSkills;
    //Special handler for new skill
    if ( skill.id === 'new'){ 
      newSkills = [
        ...state.skills,
        { 
          ...skill,
          id: uuid()
        }
      ];
    } else {
      newSkills = state.skills.reduce( ( result: SkillModel[], _skill: SkillModel ) => {
        const updateSkill: SkillModel =  (_skill.id === skill.id )? skill : _skill;
        return [
          ...result,
          updateSkill
        ] 
      }, [] );      
    }
    dispatch( { 
        type: types.UPDATE_SKILL, 
        skills: newSkills 
    } )
  }



  /**
   * Utility function to generate generic snackbar
   */
  function snackbar( message:string, hideDuration?: number){ 
    dispatch( { 
      type: types.SHOW_GENERIC_SNACKBAR,
      hideDuration,
      message,
    } )
  }

  return {
    handlePrintModeToggle,
    handlePrintPdf,
    snackbar,
    updateSkill
  };
};
