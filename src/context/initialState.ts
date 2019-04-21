export interface initialStateModel { 
    actions:any,
    dispatch:any,
    editMode: boolean,
    intro: any
    state: any,
}
export const initialState: initialStateModel= { 
    actions: undefined,
    dispatch: undefined,
    editMode: false,
    intro: { 
        name: "Lucas Lee", 
        position: "Senior Web Developer", 
        statement: `Passionate about Javascript, specialize in rapid development with a design flair. Experienced with a wide range of skillset that extends from frontend to containerized devops and AWS. Lead frontend development on a new marketing platform for EAB.`
    },
    state: undefined,
};