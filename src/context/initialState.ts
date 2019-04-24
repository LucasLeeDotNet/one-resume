//Manifest
import { manifest } from "../manifest";

//Model
import ExperienceModel from "../models/ExperienceModel";
import IntroModel from "../models/IntroModel";
import SkillModel from "../models/SkillModel";
import GenericSnackbarModel from "../models/GenericSnackbarModel";

//Utility
import uuid from 'uuid/v4';

export interface StateModel { 
    actions?:any,
    dispatch?:any,
    editMode: boolean,
    experiences?: ExperienceModel[],
    genericSnackbar: GenericSnackbarModel,
    intro: IntroModel,
    printMode: boolean,
    skills: SkillModel[],
    selectedSkill: string,
    state?: any,
}

export const initialState: StateModel = { 
    ...manifest, 
    editMode: false,
    genericSnackbar: new GenericSnackbarModel(),
    printMode: false,
    skills: manifest.skills.map( ( skill:SkillModel ) => { return { ...skill, id: uuid() }} ),
    selectedSkill: '',
};
