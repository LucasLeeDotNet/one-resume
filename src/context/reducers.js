import {
    initialState
} from './initialState';

const types = {
    SELECT_SKILL: 'SELECT_SKILL',
    TOGGLE_EDIT: 'TOGGLE_EDIT',
    UPDATE_NAME: 'UPDATE_NAME',
    UPDATE_POSITION: 'UPDATE_POSITION',
    UPDATE_SKILL: 'UPDATE_SKILL',
    UPDATE_STATEMENT: 'UPDATE_STATEMENT',
};

const reducer = (state = initialState, action) => {
    console.log({
        oldState: state,
        type: action.type,
        payload: action.payload
    });
    switch (action.type) {
        case types.SELECT_SKILL:
            return {
                ...state,
                selectedSkill: action.selectedSkill
            }
        case types.TOGGLE_EDIT:
            return {
                ...state,
                editMode: action.editMode,
                intro: {
                    ...state.intro,
                }, 
                selectedSkill: state.editMode === true ? '' : state.selectedSkill
            }
        case types.UPDATE_NAME:
            return {
                ...state,
                intro: {
                    ...state.intro,
                    name: action.name
                }
            }

        case types.UPDATE_SKILL:
            return { 
                ...state,
                skills: action.skills,
                selectedSkill: ''                
            }
        case types.UPDATE_POSITION:
            return {
                ...state,
                intro: {
                    ...state.intro,
                    position: action.position
                }
            }
        case types.UPDATE_STATEMENT:
            return {
                ...state,
                intro: {
                    ...state.intro,
                    statement: action.statement
                }
            }
        default:
            throw new Error('Unexpected action');
    }
};

export {
    initialState,
    types,
    reducer
};