import React, { useContext } from 'react';
import ExperiencesModel from '../../models/ExperienceModel';
import ExperienceComponent from './ExperienceComponent';
import { StoreContext } from '../../context/StoreContext';

export interface ExperiencesProps{}
const ExperiencesComponent = ( props: ExperiencesProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const experiences: ExperiencesModel[] = state.experinces;

    return ( 
        <div>
            {  experiences.map ( ( skill: ExperiencesModel ) => <ExperienceComponent {...skill} /> ) }
        </div>
    );  
};

export default ExperiencesComponent;