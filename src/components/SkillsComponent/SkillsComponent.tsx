import React from 'react';
import SkillModel from '../../models/SkillModel';
import SkillComponent from './SkillComponent';


export interface SkillsProps{ 
    skills: SkillModel[]
}
const SkillsComponent = ( props: SkillsProps )=> { 
    const { skills } = props;
    return ( 
        <div>
            { skills.map ( ( skill: SkillModel ) => <SkillComponent key={skill.name} {...skill} /> ) }
        </div>
    );  
};

export default SkillsComponent;