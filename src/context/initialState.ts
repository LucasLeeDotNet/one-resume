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
        statement: `Passionate about Javascript, specializing in rapid development with strong sense of design. Lead frontend development on a new marketing platform for EAB. Experienced with a wide range of skillset that extends from frontend frameworks to containerized Devops and AWS.`
    },
    skills: [
        { name: 'Javascript', level: 8.5, interest: 'Highest', icon: 'Js', lastUsed: 'Current'},
        { name: 'Typescript', level: 7, interest: 'High', icon: 'Ts', lastUsed: 'Current'},
        { name: 'React', level: 7, interest: 'High', icon: 'React', lastUsed: 'Current'},
        { name: 'Angular', level: 7.5, interest: 'High', icon: 'Angular', lastUsed: 'This Month'},
        { name: 'Node.js', level: 7.5, interest: 'High', icon: 'Node', lastUsed: 'This Month'},
        { name: 'Docker', level: 7, interest: 'High', icon: 'Docker', lastUsed: 'Current'},
        { name: 'AWS', level: 6, interest: 'High', icon: 'Aws', lastUsed: 'Current'},
        { name: 'React Native', level: 6, interest: 'High', icon: 'React', lastUsed: 'Before This Year'},
        { name: 'MongoDB', level: 5, interest: 'Moderate', icon: 'Mongodb', lastUsed: 'This Year'},
        { name: 'SQL', level: 5, interest: 'Moderate', icon: 'Sql', lastUsed: 'This Year'},
        { name: 'Photoshop', level: 7, interest: 'Moderate', icon: 'Adobe', lastUsed: 'This Month'},
        { name: 'Java', level: 4, interest: 'Moderate', icon: 'Java', lastUsed: 'Before This Year'},
        { name: 'JQuery', level: 7.5, interest: 'Low', icon: 'Js', lastUsed: 'This Year'},
        { name: 'Coldfusion', level: 6, interest: 'Low', icon: '', lastUsed: 'This Year'},
        { name: 'CSS', level: 7, interest: 'High', icon: 'Css', lastUsed: 'Current'},

    ],
    state: undefined,
};