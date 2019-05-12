// React
import React, { useContext } from "react";

// Component
import SkillComponent from "./Skill.component";

// States
import { types } from "../../context/reducers";
import { StoreContext } from "../../context/StoreContext";

// Model
import SkillModel from "../../models/SkillModel";

// Style
import "./Skills.component.scss";


const SkillsComponent = ( ) => {
  const { state, dispatch, actions } = useContext(StoreContext);
  const selectedSkill: string =  state.selectedSkill;
  const editMode: boolean = state.editMode;
  const skills: SkillModel[] = state.skills;
  const newSkill = new SkillModel();


  const handleDeleteSkill = (id: string): void => actions.deleteSkill(id);


  const handleUpdateSkill = ( skill: SkillModel ): void => {
    actions.updateSkill( skill );
  };


  const handleSelectSkill = ( id: string ): void => {
    dispatch( {
      selectedSkill: id,
      type: types.SELECT_SKILL,
    } );
  };


  return (
    <div className={"skills-container"} >
      {
        editMode ? 
        <SkillComponent
          {...newSkill}
          editMode={editMode}
          key="new"
          newFlag={true}
          onUpdateSkill={handleUpdateSkill}
          onSelectSkill={handleSelectSkill}
          selectedSkill={selectedSkill}
        />
        :
        undefined
      }
      { skills.map ( ( skill: SkillModel ) =>
        <SkillComponent
          {...skill}
          editMode={editMode}
          key={skill.id}
          onDeleteSkill={handleDeleteSkill}
          onUpdateSkill={handleUpdateSkill}
          onSelectSkill={handleSelectSkill}
          selectedSkill={selectedSkill}
        /> )
      }
    </div>
  );
};

export default SkillsComponent;
