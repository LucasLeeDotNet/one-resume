import React from 'react';
import ExperiencesModel from '../../models/ExperienceModel';
import ExperienceComponent from './ExperienceComponent';

export interface ExperiencessProps{ 
    skills: ExperiencesModel[]
}
const ExperiencessComponent = ( props: ExperiencessProps )=> { 
    const { skills } = props;
    return ( 
        <div>
            { skills.map ( ( skill: ExperiencesModel ) => <ExperienceComponent {...skill} /> ) }
        </div>
    );  
};

export default ExperiencessComponent;