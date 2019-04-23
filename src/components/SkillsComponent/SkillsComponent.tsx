import React, { useContext } from 'react';
import SkillModel from '../../models/SkillModel';
import SkillComponent from './SkillComponent';
import './SkillsComponent.scss'
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';

export interface SkillsProps{}

const SkillsComponent = ( props: SkillsProps ) => { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const selectedSkill: string =  state.selectedSkill;
    const editMode: boolean = state.editMode;
    const skills: SkillModel[] = state.skills;
    
    const handleUpdateSkill = ( skill: SkillModel ):void => { 
        actions.updateSkill( skill );
        handleSelectSkill( '' );
    }

    const handleSelectSkill = ( id: string ):void =>{ 
        dispatch( { 
            type: types.SELECT_SKILL,
            selectedSkill: id
        } );
    }

    return ( 
        <div className={'skills-container'} >
            { skills.map ( ( skill: SkillModel, index: number ) => 
                <SkillComponent editMode={editMode} selectedSkill={selectedSkill} key={skill.id} onSelectSkill={ handleSelectSkill} {...skill} handleUpdateSkill={ handleUpdateSkill }/> ) 
            }
        </div>
    );  
};

export default SkillsComponent;