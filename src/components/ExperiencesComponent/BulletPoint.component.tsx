// React
import React, { ChangeEvent } from "react";

// Material UI
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// Materion UI Icon
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";


// Component
import BulletPointSkill from "./BulletPointskill.component";

// Model
import SkillModel from "../../models/SkillModel";

// Style
import "./Experience.style.scss";

export interface IBulletPointProps {
  onAddNewSkill: ( index: number ) => void;
  onBulletPointChange: ( index: number, value: string ) => void;
  onDeleteBulletPoint: ( id: number ) => void;
  onDeleteSkill: ( index: number, skillIndex: number ) => void;
  onUpdateSkill: ( skillName: string, index: number, skillIndex: number ) => void;
  index: number;
  point: string;
  skills: string[];
  stateSkills: SkillModel[];
}

const BulletPoint = ( props: IBulletPointProps ) => {


  const  {
    onAddNewSkill,
    onBulletPointChange,
    onDeleteBulletPoint,
    onDeleteSkill,
    onUpdateSkill,
    index,
    point,
    skills,
    stateSkills,
  } = props;


  /**
   * Adds a new skill to the bullet point
   */
  const handleAddNewSkill = ():void => onAddNewSkill( index );


  /**
   * Update bullet point text statement
   *
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleBulletPointTextChange = ( event: ChangeEvent<HTMLInputElement> ): void => {
    onBulletPointChange( index, event.target.value );
  };


  /**
   * Deletes the bullet point
   */
  const handleDeleteClick = (): void => onDeleteBulletPoint( index );

  return (
    <div>
      <div className="bulletpoint-row">


        {
          /**
           * Bullet Point Text Statement Input
           * ---------------------------------
           */
        }
        <TextField
          label={"Edit Point " + (index + 1)}
          className="bullet-input fullwidth-input"
          InputLabelProps={{
              shrink: true,
          }}
          onChange={handleBulletPointTextChange}
          value={point}
        />


        {
          /**
           * Delete Bullet point Button
           * --------------------------
           */
        }
        <div>
          <IconButton aria-label="Delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>


      </div>{/** End of bulletpoint-row */}


      <div className="skills-row">


        {
          /**
           * Add Skill Button
           * ----------------
           */
        }
        <div>
          <IconButton className="add-skill-button" aria-label="add" onClick={handleAddNewSkill}>
            <AddIcon />
          </IconButton>
        </div>


        {
          /**
           * List of skills
           * --------------
           */
        }
        <div className="skills-container">
          {
            skills.map( ( skillName: string, skillIndex: number ) => {
              return (
                <BulletPointSkill
                  key={skillIndex}
                  bulletIndex={index}
                  onDeleteSkill={onDeleteSkill}
                  onUpdateSkill={onUpdateSkill}
                  skillIndex={skillIndex}
                  skillName={skillName}
                  stateSkills={stateSkills}
                />
              );
            } )
          }
        </div>
      </div>
    </div>
  );
};

export default BulletPoint;
