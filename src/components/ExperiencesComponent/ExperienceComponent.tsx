import React from 'react';
import ExperienceModel from '../../models/ExperienceModel';
import './ExperienceComponent.scss'
import AddIcon from '@material-ui/icons/Add';

export interface ExperinceComponentProps extends ExperienceModel{}

const ExperinceComponent = ( props: ExperinceComponentProps )=> { 

    const { company, position, bulletPoints, date } = props;
    return ( 
        <div className="exp">
            <div className="line1">
                <div className="company">{company}</div> 
                <div className="date">{date.toUpperCase()}</div>
            </div>
            <h2>{position}</h2>
            {bulletPoints.map( ( point: string, index: number ) => <div key={index} className="bullet"><AddIcon className="bullet-icon"/> {point}</div> ) }
        </div>
    );
}

export default ExperinceComponent;