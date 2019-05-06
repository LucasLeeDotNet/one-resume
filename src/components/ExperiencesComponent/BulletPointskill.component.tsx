// React
import React, { ChangeEvent } from "react";

// Material UI
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// Materion UI Icon
import ClearIcon from "@material-ui/icons/Clear";

// FontAwesome
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Model
import SkillModel from "../../models/SkillModel";

// Style
import "./BulletPointSkill.style.scss";

export interface IBulletPointSkillProps {
  bulletIndex: number;
  onDeleteSkill: ( index: number, skillIndex: number ) => void;
  onUpdateSkill: ( skillName: string, index: number, skillIndex: number ) => void;
  skillIndex: number;
  skillName: string;
  stateSkills: SkillModel[];
}

const BulletPointSkill = ( props: IBulletPointSkillProps ) => {

  // Reassigning the icon set to allow for dynamic input of icon names
  const brandIconSet: any = brandIcons;

  const  {
    bulletIndex,
    onDeleteSkill,
    onUpdateSkill,
    skillIndex,
    skillName,
    stateSkills,
  } = props;


  /**
   * Updates a specific skill
   *
   * @param {number}                          skillIndex  Index of the skill
   * @param {ChangeEvent<HTMLSelectElement>}  event
   */
  const handleUpdateSkill = ( iSkillIndex: number, event: ChangeEvent<HTMLSelectElement>): void => {
    onUpdateSkill( event.target.value, bulletIndex, iSkillIndex );
  };

  const handleDeleteSkill = (): void => onDeleteSkill( bulletIndex, skillIndex );

  return (
    <div className="skill-edit-container">


      {
        /**
         * Skill Select
         * ------------
         */
      }
      <FormControl className="select-input" >
      <InputLabel htmlFor="interest">Select Skills</InputLabel>
      <Select
        value={skillName}
        onChange={handleUpdateSkill.bind( {}, skillIndex )}
        inputProps={{
          id: "skills",
          name: "skills",
        }}
      >


        {
          /**
           * Select option for skills
           * ------------------------
           */
        }
        <MenuItem value="">New Skill</MenuItem>
        { stateSkills.map( ( skill: SkillModel ) => {
          return (
            <MenuItem key={skill.name} value={skill.name}>
              { skill.icon !== "" ?
                <FontAwesomeIcon className="small-skill-icon" icon={brandIconSet[ `fa${skill.icon}` ]}/>
                :
                ""
              } &nbsp;{skill.name}
            </MenuItem>
          );
        } ) }


      </Select>
      </FormControl>


      {
         /**
          * Remove Skill Button
          * -------------------
          */
      }
      <IconButton className="remove-skill-button" aria-label="Remove Skill" onClick={handleDeleteSkill}>
        <ClearIcon />
      </IconButton>
    </div>
  );
};

export default BulletPointSkill;
