import { types } from "./reducers";
import SkillModel from "../models/SkillModel";
import { StateModel } from "./initialState";

export const useActions = (state:StateModel, dispatch: Function) => {

  /**
   * Search and updates an existing skill
   */
  function updateSkill( skill: SkillModel ){ 
    const newSkills = state.skills.reduce( ( result: SkillModel[], _skill: SkillModel ):StateModel => {
      const updateSkill: SkillModel =  (_skill.id === skill.id )? skill : _skill;
      return [
        ...result,
        updateSkill
      ] 
    }, [] );

    dispatch( { 
        type: types.UPDATE_SKILL, 
        skills: newSkills 
    } )
  }

  return {
    updateSkill
  };
};
