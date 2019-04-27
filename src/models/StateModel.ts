//Model
import IntroModel from "../models/IntroModel";
import ExperienceModel from "../models/ExperienceModel";
import GenericSnackbarModel from "../models/GenericSnackbarModel";
import SkillModel from "../models/SkillModel";

export interface StateModel { 
  actions?:any,
  dispatch?:any,
  editMode: boolean,
  experiences: ExperienceModel[],
  genericSnackbar: GenericSnackbarModel,
  intro: IntroModel,
  printMode: boolean,
  skills: SkillModel[],
  selectedExperience: string,
  selectedSkill: string,
  state?: any,
}