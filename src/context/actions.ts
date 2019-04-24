//Context
import { types } from "./reducers";

//Model
import SkillModel from "../models/SkillModel";
import { StateModel } from "./initialState";

//Utility
import uuid from 'uuid/v4';

export const useActions = (state:StateModel, dispatch: Function) => {

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
    snackbar,
    updateSkill
  };
};
