import React from 'react';
import ExperienceModel from '../../models/ExperienceModel';

export interface ExperinceComponentProps extends ExperienceModel{}

const ExperinceComponent = ( props: ExperinceComponentProps )=> { 

    const { company, position, bulletPoints } = props;
    return ( 
        <div>
            <h1>{name}</h1>
            <h2>{position}</h2>
            {bulletPoints.map( point => point ) }
        </div>
    );
}

export default ExperinceComponent;