import React from 'react';
import SkillModel from '../../models/SkillModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import './SkillComponent.scss';
import { LinearProgress } from '@material-ui/core';

export interface SkillProps extends SkillModel{}

const SkillComponent = ( props: SkillProps )=> { 
    const { icon, name, level, interest, lastUsed } = props;

    //Reassigning the icon set to allow for dynamic input of icon names
    const brandIconSet:any = brandIcons;
    const faIcon = 'fa' + icon;
    
    return ( 
        <div className="skill-container">
            <div className="icon-container">
                <FontAwesomeIcon className="skill-icon" icon={ brandIconSet[ faIcon ]}/>
            </div>
            <div>
                <div className="skill-name">{name}</div>
                <div className="skill-progress-container">
                    <div className="skill-row"> <span className="skill-label">Skill </span> <div className="spacer"/>{level}/10 </div>
                    <LinearProgress variant="determinate" value={level/10*100} />
                    <div className="skill-row"> <span className="skill-label">Interest </span> <div className="spacer"/> {interest}</div>
                    <div className="skill-row"> <span className="skill-label">Last used </span> <div className="spacer"/> {lastUsed}</div>

                </div>
            </div>
        </div>
    );  
};

export default SkillComponent;