// Model
import IStateModel from "../models/StateModel";
import {
  initialState,
} from "./initialState";


const types = {
  HIDE_GENERIC_SNACKBAR: "HIDE_GENERIC_SNACKBAR",
  SELECT_EXPERIENCE: "SELECT_EXPERIENCE",
  SELECT_SKILL: "SELECT_SKILL",
  SHOW_GENERIC_SNACKBAR: "SHOW_GENERIC_SNACKBAR",
  TOGGLE_EDIT: "TOGGLE_EDIT",
  TOGGLE_PRINT: "TOGGLE_PRINT",
  UPDATE_EXPERIENCE: "UPDATE_EXPERIENCE",
  UPDATE_NAME: "UPDATE_NAME",
  UPDATE_POSITION: "UPDATE_POSITION",
  UPDATE_SKILL: "UPDATE_SKILL",
  UPDATE_STATEMENT: "UPDATE_STATEMENT",
};

const reducer = (state: IStateModel = initialState, action: any): IStateModel => {

  switch (action.type) {
    /**
     * Hide the generic snackbar
     */
    case types.HIDE_GENERIC_SNACKBAR:
      return {
        ...state,
        genericSnackbar: {
          ...state.genericSnackbar,
          open: false,
        },
      };

      /**
       * Select a experience with mouse click in edit mode
       */
    case types.SELECT_EXPERIENCE:
      return {
        ...state,
        selectedExperience: action.selectedExperience,
        selectedSkill: "",
      };

      /**
       * Select a skill with mouse click
       */
    case types.SELECT_SKILL:
      return {
        ...state,
        selectedExperience: "",
        selectedSkill: action.selectedSkill,
      };

      /**
       * Show the generic snackbar
       */
    case types.SHOW_GENERIC_SNACKBAR:
      return {
        ...state,
        genericSnackbar: {
          ...state.genericSnackbar,
          hideDuration: action.hideDuration || state.genericSnackbar.hideDuration,
          message: action.message,
          open: true,
        },
      };

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
          selectedSkill: state.editMode === true ? "" : state.selectedSkill,
      };

      /**
       * Toggle element adjustment to enable the page for print
       */
    case types.TOGGLE_PRINT:
      return {
        ...state,
        printMode: action.printMode,
      };

      /**
       * Update a particular experience
       */
    case types.UPDATE_EXPERIENCE:
      return {
        ...state,
        experiences: action.experiences,
          selectedExperience: action.selectedExperience || "",
      };

      /**
       * Update the name Field
       */
    case types.UPDATE_NAME:
      return {
        ...state,
        intro: {
          ...state.intro,
          name: action.name,
        },
      };

      /**
       * Update the position field
       */
    case types.UPDATE_POSITION:
      return {
        ...state,
        intro: {
          ...state.intro,
          position: action.position,
        },
      };

      /**
       * Update a particular skill
       */
    case types.UPDATE_SKILL:
      return {
        ...state,
        selectedSkill: "",
        skills: action.skills,
      };


      /**
       * Update the statement field
       */
    case types.UPDATE_STATEMENT:
      return {
        ...state,
        intro: {
          ...state.intro,
          statement: action.statement,
        },
      };
    default:
      throw new Error("Unexpected action");
  }
};

export {
  initialState,
  types,
  reducer,
};
