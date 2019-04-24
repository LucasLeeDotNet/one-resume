//React
import React, { useContext } from 'react';

//Context
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';

//Component
import SkillComponent from './SkillComponent';

//Model
import SkillModel from '../../models/SkillModel';

//Style
import './SkillsComponent.scss'

export interface SkillsProps{}

const SkillsComponent = ( props: SkillsProps ) => { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const selectedSkill: string =  state.selectedSkill;
    const editMode: boolean = state.editMode;
    const skills: SkillModel[] = state.skills;
    const newSkill = new SkillModel();

    const handleUpdateSkill = ( skill: SkillModel ):void => { 
        actions.updateSkill( skill );
    }

    const handleSelectSkill = ( id: string ):void =>{ 
        dispatch( { 
            type: types.SELECT_SKILL,
            selectedSkill: id,
        } );
    }

    return ( 
        <div className={'skills-container'} >
            <SkillComponent {...newSkill} newFlag={true} editMode={editMode} selectedSkill={selectedSkill} key="new" onSelectSkill={ handleSelectSkill}  handleUpdateSkill={ handleUpdateSkill }/>
            { skills.map ( ( skill: SkillModel ) => 
                <SkillComponent {...skill} editMode={editMode} selectedSkill={selectedSkill} key={skill.id} onSelectSkill={ handleSelectSkill}  handleUpdateSkill={ handleUpdateSkill }/> ) 
            }
        </div>
    );  
};

export default SkillsComponent;