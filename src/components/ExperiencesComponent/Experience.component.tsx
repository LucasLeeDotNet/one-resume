// React
import React, { ChangeEvent, useEffect, useState } from "react";

// Material UI
import { Fab, TextField, Tooltip } from "@material-ui/core";

// Materion UI Icon
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// FontAwesome
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component
import BulletPoint from "./BulletPoint.component";

// Model
import BulletModel from "../../models/BulletModel";
import ExperienceModel from "../../models/ExperienceModel";
import SkillModel from "../../models/SkillModel";

// Style
import "./Experience.style.scss";

export interface IExperienceComponentProps extends ExperienceModel {
  editMode: boolean;
  handleDeleteExperience: Function;
  handleSelectExperience: Function;
  handleUpdateExperience: Function;
  selectedExperience: string;
  skills: SkillModel[];
}

const ExperienceComponent = ( props: IExperienceComponentProps ) => {
    const {
      company,
      bulletPoints,
      date,
      editMode,
      handleDeleteExperience,
      handleUpdateExperience,
      handleSelectExperience,
      id,
      position,
      selectedExperience,
      skills,
    } = props;

    // Reassigning the icon set to allow for dynamic input of icon names
    const brandIconSet: any = brandIcons;

    // localstate
    const [ companyEdit, handleEditCompany ] = useState( company );
    const [ dateEdit, handleEditDate ] = useState( date.toUpperCase() );
    const [ positionEdit, handleEditPosition ] = useState( position );
    const [ bulletPointsEdit, handleEditBulletPoints ] = useState( bulletPoints );

    const skillsMapByName: { [key: string]: SkillModel} = skills.reduce( ( result: object, skill ) => {
      return {
        ... result,
        [skill.name]: skill,
      };
    }, {} );

    useEffect( () => {
        handleEditBulletPoints(bulletPoints);
    }, [bulletPoints]);

    const getAllEdits = () => {
      return {
        bulletPoints: bulletPointsEdit,
        company: companyEdit,
        date: dateEdit,
        id,
        position: positionEdit,
      };
    };

    const handleAddNewBulletPoint = () => {
      handleUpdateExperience( {
        ...getAllEdits(),
        bulletPoints: [ ...bulletPointsEdit, new BulletModel() ],
      }, id );
    };


    const handleAddNewSkill = ( index: number ): void => {
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ] = {
        ...newBulletPoints[ index ],
        skills: [ ...newBulletPoints[ index ].skills, "" ],
      };

      handleUpdateExperience( {
        ...getAllEdits(),
        bulletPoints: newBulletPoints,
      }, id );
    };


    const handleUpdateSkill = ( skillName: string, index: number, skillIndex: number ): void => {
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ].skills[ skillIndex ] = skillName;

      handleUpdateExperience( {
        ...getAllEdits(),
        bulletPoints: newBulletPoints,
      }, id );
    };


    const handleDeleteSkill = ( index: number, skillIndex: number ): void => {
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ].skills = newBulletPoints[ index ].skills.filter(
        ( skill: string, skillIndexInArray: number ) => skillIndex !== skillIndexInArray,
      );

      handleUpdateExperience( {
        ...getAllEdits(),
        bulletPoints: newBulletPoints,
      }, id );
    };


    const handleDeleteBulletPoint = ( _id: number ): void => {
      const newBulletPoints = bulletPoints.filter( ( item: BulletModel, index: number ) => _id !== index );
      handleUpdateExperience( {
        ...getAllEdits(),
        bulletPoints: newBulletPoints,
      }, id );
    };


    /**
     * Clicking on the non edit experience, will trigger editing when edit mode is on
     */
    const handleExperienceClicked = (): void => {
      if ( editMode ) { handleSelectExperience(id); }
    };


    /**
     * Reset the skill by loading in the local state with the props
     */
    const handleResetExperience = ( event?: React.MouseEvent<HTMLElement> ): void => {
      if ( event ) { event.stopPropagation(); }

      handleSelectExperience( "" );
      handleEditCompany( company );
      handleEditDate( date.toUpperCase() );
      handleEditPosition( position );
      handleEditBulletPoints( bulletPoints );
  };


  /**
   * Update Experience handler gathering edited data for the handleUpdateExperience callback
   */
    const _handleUpdateExperience = ( event: React.MouseEvent<HTMLElement> ): void => {
      event.stopPropagation();
      if ( editMode ) { handleUpdateExperience( getAllEdits() ); }
  };


    /**
     * Updates a single bullet in the list of bullets
     */
    const handleEditBulletPoint = ( index: number, value: string ): void => {
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ] = {
        point: value,
        skills: newBulletPoints[ index ].skills,
      };
      handleEditBulletPoints( newBulletPoints );
    };


    return (
      <div>
        { editMode && selectedExperience === id ?
        <div className="edit-container">
          <div className="two-input-container fullwidth-input">


            {
              /**
               * Company Text Input Field
               * ------------------------
               */
            }
            <TextField
                label="Edit Company"
                className="company-input company"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={( event: ChangeEvent<HTMLInputElement> ) => handleEditCompany( event.target.value )}
                value={companyEdit}
            />


            {
              /**
               * Date Text Input Field
               * ---------------------
               */
            }
            <TextField
                label="Edit Experinence Date"
                className="date-input"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={( event: ChangeEvent<HTMLInputElement> ) => handleEditDate( event.target.value.toUpperCase() )}
                value={dateEdit}
            />


          </div>


          {
            /**
             * Position Text Input Field
             * -------------------------
             */
          }
          <TextField
              label="Edit Position"
              className="position-input fullwidth-input"
              InputLabelProps={{
                  shrink: true,
              }}
              onChange={( event: ChangeEvent<HTMLInputElement> ) => handleEditPosition( event.target.value )}
              value={positionEdit}
          />


            {
              /**
               * Bullet Point Custom Input
               * -------------------------
               */
            }
            <div className="bulletpoints-container">
              <label className="bulletpoints-label">Bullet Points</label>
              { bulletPointsEdit.map(
                ( point: BulletModel, index: number ) => {
                  return (
                    <BulletPoint
                      key={index}
                      {...point}
                      index={index}
                      onAddNewSkill={handleAddNewSkill}
                      onBulletPointChange={handleEditBulletPoint}
                      onDeleteBulletPoint={handleDeleteBulletPoint}
                      onDeleteSkill={handleDeleteSkill}
                      onUpdateSkill={handleUpdateSkill}
                      stateSkills={skills}
                    />
                  );
                },
              ) }


              {
                 /**
                  * Add New Bullet Point Button
                  * ---------------------------
                  */
              }
              <Fab className="add-bullet-button" variant="extended" color="inherit" aria-label="Add" onClick={handleAddNewBulletPoint}>
                <AddIcon/> &nbsp;
                Add New Bullet Point
              </Fab>
            </div>


            {
              /**
               * Action Buttons
               * --------------
               */
            }
            <div className="action-button-container">
              <Tooltip title="Save Experience">
                <Fab className="check-button action-button" aria-label="Save Experience" onClick={_handleUpdateExperience} >
                    <CheckIcon/>
                </Fab>
              </Tooltip>

              <Tooltip title="Cancel">
                <Fab className="action-button" aria-label="Cancel" onClick={handleResetExperience} >
                    <ClearIcon/>
                </Fab>
              </Tooltip>

              <Tooltip title="Delete Experience">
                <Fab className="action-button" color="secondary" aria-label="Delete Experience" onClick={() => handleDeleteExperience(id)} >
                    <DeleteForeverIcon/>
                </Fab>
              </Tooltip>

            </div>
        </div>
        :
        /**
         * Non Edit Mode
         * -------------
         */
        <div className={"exp" + (editMode ? " edit-outline clickable" : "")} onClick={handleExperienceClicked}>
            <div className="line1">
                <div className="company">{company}</div>
                <div className="date">{date.toUpperCase()}</div>
            </div>
            <h2>{position}</h2>
            {bulletPoints.map( ( point: BulletModel,
                                 index: number ) =>
                <div className="bullet-container" key={index}>
                  <div key={index} className="bullet"><AddIcon className="bullet-icon"/> {point.point}</div>
                  <div className="nonedit-skill-list">
                    { point.skills.sort().map( ( skillName: string, index: number ) => {
                      const skillObject: SkillModel = skillsMapByName[skillName];
                      return (
                        <div className="nonedit-skill-item" key={index}>{ skillObject && skillObject.icon !== "" ?
                          <FontAwesomeIcon className="small-skill-icon" icon={brandIconSet[ `fa${skillObject.icon}` ]}/> : ""}
                          &nbsp;{skillObject && skillObject.name}
                        </div>);
                    } ) }
                  </div>
                </div>,

              ) }
        </div>
        }
      </div>
    );
};

export default ExperienceComponent;
