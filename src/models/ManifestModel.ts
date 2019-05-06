import ExperienceModel from "./ExperienceModel";
import IntroModel from "./IntroModel";
import SkillModel from "./SkillModel";

/**
 * Defines the interface for the user pastable manifest
 */
export default interface IManifestModel {
  experiences: ExperienceModel[];
  intro: IntroModel;
  skills: SkillModel[];
}
