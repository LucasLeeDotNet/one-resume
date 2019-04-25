//React
import React, { useContext } from 'react';

//Context
import { StoreContext } from '../../context/StoreContext';

//Component
import ExperienceComponent from './ExperienceComponent';

//Material UI
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

//Model
import ExperienceModel from '../../models/ExperienceModel';
import ExperiencesModel from '../../models/ExperienceModel';
import { types } from '../../context/reducers';

//Style
import './ExperiencesComponent.scss';

export interface ExperiencesProps{}

const ExperiencesComponent = ( props: ExperiencesProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const { editMode, selectedExperience } = state;
    const experiences: ExperiencesModel[] = state.experiences;



    /**
     * Handle update for an exisiting experience
     */
    const handleUpdateExperience = ( experience: ExperienceModel ):void => { 
      actions.updateExperience( experience );
    }



    /**
     * Handle selection of a experience during edit mode
     * @param id 
     */
    const handleSelectExperience = ( id: string ):void =>{ 
        dispatch( { 
            type: types.SELECT_EXPERIENCE,
            selectedExperience: id,
        } );
    }
    
    return ( 
      <div>
        {  experiences.map ( ( experinence: ExperiencesModel ) => 
          <ExperienceComponent {...experinence} 
            key={experinence.id} 
            editMode={editMode}
            handleDeleteExperience={( id:string ) => actions.deleteExperience(id)}
            handleUpdateExperience={handleUpdateExperience}
            handleSelectExperience={handleSelectExperience}
            selectedExperience={selectedExperience}
          /> ) }
        { editMode ? 
        <Fab className="add-exp-button" variant="extended" color="inherit" aria-label="Add" onClick={ ()=> handleUpdateExperience( new ExperienceModel() ) }>
            <AddIcon/> &nbsp;
            Add New Experience
          </Fab>: undefined }
      </div>
    );  
};

export default ExperiencesComponent;