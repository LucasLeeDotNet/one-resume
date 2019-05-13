// Model
import ExperienceModel from "../models/ExperienceModel";
import GenericSnackbarModel from "../models/GenericSnackbarModel";
import IntroModel from "../models/IntroModel";
import SkillModel from "../models/SkillModel";

export default interface IStateModel {
  editMode: boolean;
  experiences: ExperienceModel[];
  genericSnackbar: GenericSnackbarModel;
  intro: IntroModel;
  printMode: boolean;
  skills: SkillModel[];
  selectedExperience: string;
  selectedSkill: string;
}
