// Manifest
import { manifest } from "../manifest";

// Model
import ExperienceModel from "../models/ExperienceModel";
import GenericSnackbarModel from "../models/GenericSnackbarModel";
import SkillModel from "../models/SkillModel";
import IStateModel from "../models/StateModel";

// Utility
import uuid from "uuid/v4";

export const initialState: IStateModel = {
    ...manifest,
    editMode: false,
    experiences: manifest.experiences.map( ( experience: ExperienceModel ) => ({ ...experience, id: uuid() }) ),
    genericSnackbar: new GenericSnackbarModel(),
    printMode: false,
    selectedExperience: "",
    selectedSkill: "",
    skills: manifest.skills.map( ( skill: SkillModel ) => ({ ...skill, id: uuid() }) ),
};
