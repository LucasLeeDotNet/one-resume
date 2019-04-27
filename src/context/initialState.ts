//Manifest
import { manifest } from "../manifest";

//Model
import ExperienceModel from "../models/ExperienceModel";
import GenericSnackbarModel from "../models/GenericSnackbarModel";
import SkillModel from "../models/SkillModel";
import { StateModel } from "../models/StateModel";

//Utility
import uuid from 'uuid/v4';

export const initialState: StateModel = { 
    ...manifest, 
    editMode: false,
    experiences: manifest.experiences.map( ( experience:ExperienceModel ) => { return { ...experience, id: uuid() }} ),
    genericSnackbar: new GenericSnackbarModel(),
    printMode: false,
    skills: manifest.skills.map( ( skill:SkillModel ) => { return { ...skill, id: uuid() }} ),
    selectedExperience: '',
    selectedSkill: '',
};
