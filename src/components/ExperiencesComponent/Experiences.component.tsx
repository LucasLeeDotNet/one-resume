// React
import React, { useContext } from "react";

// Material UI
import { Fab } from "@material-ui/core";

// Material UI Icon
import AddIcon from "@material-ui/icons/Add";

// Component
import ExperienceComponent from "./Experience.component";

// Context
import { StoreContext } from "../../context/StoreContext";

// Model
import { types } from "../../context/reducers";
import ExperienceModel from "../../models/ExperienceModel";
import ExperiencesModel from "../../models/ExperienceModel";

// Style
import "./Experiences.style.scss";

const ExperiencesComponent = ( ) => {

    const { state, dispatch, actions } = useContext(StoreContext);
    const { editMode, selectedExperience, skills } = state;
    const experiences: ExperiencesModel[] = state.experiences;


    /**
     * Adds a new experience
     */
    const handleAddNewExperience = (): void => handleUpdateExperience( new ExperienceModel() );


    /**
     * Deletes an existing experience
     *
     * @param {string} id Unique Id for the experience
     */
    const handleDeleteExperience = ( id: string ): void => actions.deleteExperience(id);


    /**
     * Handle update for an exisiting experience
     */
    const handleUpdateExperience = ( experience: ExperienceModel, selectedExp?: string ): void => {
        actions.updateExperience( experience, selectedExp );
    };


    /**
     * Handle selection of a experience during edit mode
     * @param id
     */
    const handleSelectExperience = ( id: string ): void => {
        dispatch( {
            selectedExperience: id,
            type: types.SELECT_EXPERIENCE,
        } );
    };


    return (
      <div>


        {
          /**
           * Map of all current experinences
           * -------------------------------
           */
        }
        {  experiences.map( ( experience: ExperiencesModel ) =>
          <ExperienceComponent
            {...experience}
            key={experience.id}
            editMode={editMode}
            handleDeleteExperience={handleDeleteExperience}
            handleUpdateExperience={handleUpdateExperience}
            handleSelectExperience={handleSelectExperience}
            selectedExperience={selectedExperience}
            skills={skills}
          /> ) }


        {
          /**
           * Add Experience Button
           * ---------------------
           */
        }
        { editMode ?
          <Fab
            className="add-exp-button"
            variant="extended"
            color="inherit"
            aria-label="Add"
            onClick={handleAddNewExperience}
          >
            <AddIcon/> &nbsp;
            Add New Experience
          </Fab>
          :
          undefined }


      </div>
    );
};

export default ExperiencesComponent;
