//Model
import {
    initialState, StateModel
} from './initialState';

const types = {
    HIDE_GENERIC_SNACKBAR: 'HIDE_GENERIC_SNACKBAR',
    SELECT_SKILL: 'SELECT_SKILL',
    SHOW_GENERIC_SNACKBAR: 'SHOW_GENERIC_SNACKBAR',
    TOGGLE_EDIT: 'TOGGLE_EDIT',
    TOGGLE_PRINT: 'TOGGLE_PRINT',
    UPDATE_NAME: 'UPDATE_NAME',
    UPDATE_POSITION: 'UPDATE_POSITION',
    UPDATE_SKILL: 'UPDATE_SKILL',
    UPDATE_STATEMENT: 'UPDATE_STATEMENT',
};

const reducer = (state:StateModel = initialState, action:any ):StateModel => {

  switch (action.type) {
        /**
         * Hide the generic snackbar
         */
        case types.HIDE_GENERIC_SNACKBAR:
          return { 
            ...state,
            genericSnackbar: { 
              ...state.genericSnackbar,
              open: false
            }
          }

        /**
         * Select a skill with mouse click
         */
        case types.SELECT_SKILL:
            return {
                ...state,
                selectedSkill: action.selectedSkill
            }

        /**
         * Show the generic snackbar
         */
        case types.SHOW_GENERIC_SNACKBAR:
        return { 
          ...state,
          genericSnackbar: { 
            ...state.genericSnackbar,
            open: true,
            hideDuration: action.hideDuration || state.genericSnackbar.hideDuration,
            message: action.message
          }
        }

        /**
         * Toggle global edit mode
         */
        case types.TOGGLE_EDIT:
            return {
                ...state,
                editMode: action.editMode,
                intro: {
                    ...state.intro,
                }, 
                selectedSkill: state.editMode === true ? '' : state.selectedSkill
            }

        /**
         * Toggle element adjustment to enable the page for print
         */
        case types.TOGGLE_PRINT:
        return {
            ...state,
            printMode: action.printMode, 
            editMode: false
        }


        /**
         * Update the name Field
         */
        case types.UPDATE_NAME:
            return {
                ...state,
                intro: {
                    ...state.intro,
                    name: action.name
                }
            }

        /**
         * Update the position field
         */
        case types.UPDATE_POSITION:
            return {
                ...state,
                intro: {
                    ...state.intro,
                    position: action.position
                }
            }
        
        /**
         * Update a particular skill
         */
        case types.UPDATE_SKILL:
            return { 
                ...state,
                skills: action.skills,
                selectedSkill: ''                
            }
        

        /**
         * Update the statement field
         */
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