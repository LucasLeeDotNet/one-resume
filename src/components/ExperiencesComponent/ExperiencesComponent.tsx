//React
import React, { useContext } from 'react';

//Context
import { StoreContext } from '../../context/StoreContext';

//Component
import ExperienceComponent from './ExperienceComponent';

//Model
import ExperiencesModel from '../../models/ExperienceModel';

export interface ExperiencesProps{}
const ExperiencesComponent = ( props: ExperiencesProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);
    
    const experiences: ExperiencesModel[] = state.experiences;

    return ( 
        <div>
            {  experiences.map ( ( skill: ExperiencesModel, index: number ) => <ExperienceComponent {...skill} key={index}/> ) }
        </div>
    );  
};

export default ExperiencesComponent;