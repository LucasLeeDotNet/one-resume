import IntroModel from "../models/IntroModel";
import SkillModel from "../models/SkillModel";

export interface initialStateModel { 
    actions:any,
    dispatch:any,
    editMode: boolean,
    intro: IntroModel,
    skills: SkillModel[],
    state: any,
}
export const initialState: initialStateModel= { 
    actions: undefined,
    dispatch: undefined,
    editMode: false,
    intro: { 
        name: "Lucas Lee", 
        position: "Senior Web Developer", 
        statement: `Passionate about Javascript, specializing in rapid development with a unique design flair. Lead frontend development on a new marketing platform for EAB. Experienced with a wide range of skillset that extends from frontend frameworks to containerized Devops and AWS.`
    },
    skills: [
        { name: 'Javascript', level: 8.5, preferred: 'high', icon: 'Js'}
    ],
    state: undefined,
};