import React, { useContext } from 'react';
import SkillModel from '../../models/SkillModel';
import SkillComponent from './SkillComponent';
import './SkillsComponent.scss'
import { StoreContext } from '../../context/StoreContext';

export interface SkillsProps{}

const SkillsComponent = ( props: SkillsProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const skills:SkillModel[] = state.skills;
    
    return ( 
        <div className="skills-container">
            { skills.map ( ( skill: SkillModel ) => <SkillComponent key={skill.name} {...skill} /> ) }
        </div>
    );  
};

export default SkillsComponent;