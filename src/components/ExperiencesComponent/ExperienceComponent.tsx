//React
import React, { useState, ChangeEvent, useEffect } from 'react';

//Material UI
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Fab, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


//FontAwesome
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

//Model
import ExperienceModel, { BulletModel } from '../../models/ExperienceModel';

//Style
import './ExperienceComponent.scss'
import SkillModel from '../../models/SkillModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ExperienceComponentProps extends ExperienceModel{
  editMode: boolean;
  handleDeleteExperience: Function;
  handleSelectExperience: Function;
  handleUpdateExperience: Function;
  selectedExperience: string;
  skills: SkillModel[];
}

const ExperienceComponent = ( props: ExperienceComponentProps )=> { 
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
      skills
    } = props;

    //Reassigning the icon set to allow for dynamic input of icon names
    const brandIconSet:any = brandIcons;
    
    //localstate
    const [ companyEdit, handleEditCompany ] = useState( company );
    const [ dateEdit, handleEditDate ] = useState( date.toUpperCase() );
    const [ positionEdit, handleEditPosition ] = useState( position );
    const [ bulletPointsEdit, handleEditBulletPoints ] = useState( bulletPoints );

    const skillsMapByName: { [key:string]:SkillModel} = skills.reduce( ( result:object, skill ) => { 
      return { 
        ... result,
        [skill.name]: skill
      };
    }, {} );

    useEffect( () => { 
        handleEditBulletPoints(bulletPoints);
    },[bulletPoints]);



    const handleAddNewBulletPoint = () => { 
      handleUpdateExperience( { 
        id,
        company: companyEdit,
        date: dateEdit,
        position: positionEdit,
        bulletPoints: [ ...bulletPointsEdit, new BulletModel() ]
      }, id );
    }



    const handleAddNewSkill = ( index: number ) => { 
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ] = { 
        ...newBulletPoints[ index ],
        skills: [ ...newBulletPoints[ index ].skills, '' ]
      };



      handleUpdateExperience( { 
        id,
        company: companyEdit,
        date: dateEdit,
        position: positionEdit,
        bulletPoints: newBulletPoints
      }, id );
    }



    const handleUpdateSkill = ( skillName: string, index: number, skillIndex: number ) => { 
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ].skills[ skillIndex ] = skillName;

      handleUpdateExperience( { 
        id,
        company: companyEdit,
        date: dateEdit,
        position: positionEdit,
        bulletPoints: newBulletPoints
      }, id );
    }



    const handleDeleteSkill = ( index: number, skillIndex: number ) => { 
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ].skills = newBulletPoints[ index ].skills.filter( ( skill:string, index: number ) => skillIndex !== index );

      handleUpdateExperience( { 
        id,
        company: companyEdit,
        date: dateEdit,
        position: positionEdit,
        bulletPoints: newBulletPoints
      }, id );
    }


  
    const handleDeleteBulletPoint = ( _id: number ) => { 
      const newBulletPoints = bulletPoints.filter( ( item: BulletModel, index: number ) => _id !== index );
      handleUpdateExperience( { 
        id,
        company: companyEdit,
        date: dateEdit,
        position: positionEdit,
        bulletPoints: newBulletPoints
      }, id );
    }



    /**
     * Reset the skill by loading in the local state with the props
     */
    const handleResetExperience = ( event?: React.MouseEvent<HTMLElement> ):void => {
      event && event.stopPropagation();

      handleSelectExperience( '' );
      handleEditCompany( company ); 
      handleEditDate( date.toUpperCase() );     
      handleEditPosition( position );     
      handleEditBulletPoints( bulletPoints );     
  };



  /**
   * Update Experience handler gathering edited data for the handleUpdateExperience callback
   */
  const _handleUpdateExperience = ( event: React.MouseEvent<HTMLElement> ):void => { 
      event.stopPropagation();
      editMode && handleUpdateExperience( { 
        id,
        company: companyEdit,
        date: dateEdit,
        position: positionEdit,
        bulletPoints: bulletPointsEdit
      } );
  };



    /**
     * Updates a single bullet in the list of bullets
     */
    const handleEditBulletPoint = ( index: number, value: string ) => { 
      const newBulletPoints = [ ...bulletPointsEdit ];
      newBulletPoints[ index ] = { 
        point: value,
        skills: newBulletPoints[ index ].skills
      };
      handleEditBulletPoints( newBulletPoints );
    }

    return ( 
      <div>
        { editMode && selectedExperience === id ? 
        /**
         * Edit Mode
         * ---------
         */
        <div className="edit-container">
          <div className="two-input-container fullwidth-input">
            {/**
              Company Input
              -------------
             */}
            <TextField
                label="Edit Company"
                className="company-input company"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditCompany( event.target.value ) }
                value={companyEdit}
            /> 
            {/**
              Date Input
              ----------
             */}
            <TextField
                label="Edit Experinence Date"
                className="date-input"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditDate( event.target.value.toUpperCase() ) }
                value={dateEdit}
            /> 
          </div>
          {/**
            Position Input
            --------------
            */}          
          <TextField
              label="Edit Position"
              className="position-input fullwidth-input"
              InputLabelProps={{
                  shrink: true,
              }}
              onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditPosition( event.target.value ) }
              value={positionEdit}
          />
            {/**
              Bullet Points Input
              -------------------
             */}
            <div className="bulletpoints-container">
              <label className="bulletpoints-label">Bullet Points</label>
              { bulletPointsEdit.map( 
                ( point: BulletModel, index: number ) => 
                  <div key={index}>
                    <div className="bulletpoint-row">
                      <TextField
                        label={'Edit Point ' + (index+1)}
                        className="bullet-input fullwidth-input"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditBulletPoint( index, event.target.value ) }
                        value={point.point}
                      />
                      <div>
                        <IconButton aria-label="Delete" onClick={()=>handleDeleteBulletPoint( index )}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="skills-row">
                      <div>
                        <IconButton className="add-skill-button" aria-label="add" onClick={()=>handleAddNewSkill( index )}>
                          <AddIcon /> 
                        </IconButton>
                      </div>
                      <div className="skills-container">
                        { 
                          point.skills.map( ( skillName:string, skillIndex: number ) => { 
                            return (
                              <div key={skillIndex}>
                                <FormControl className="select-input" >
                                <InputLabel htmlFor="interest">Select Skills</InputLabel>
                                <Select
                                    value={skillName}
                                    onChange={(event:ChangeEvent<HTMLSelectElement>)=>handleUpdateSkill( event.target.value, index, skillIndex )}
                                    inputProps={{
                                    name: 'skills',
                                    id: 'skills',
                                    }}
                                    >
                                    <MenuItem value="">New Skill</MenuItem>
                                    {skills.map( ( skill: SkillModel ) => { 
                                      return ( 
                                        <MenuItem key={skill.name} value={skill.name}>{ skill.icon !== '' ? <FontAwesomeIcon className="small-skill-icon" icon={ brandIconSet[ `fa${skill.icon}` ]}/> : ''} &nbsp;{skill.name}</MenuItem>
                                      );
                                    } ) }
                                </Select>
                                </FormControl>
                                <IconButton className="remove-skill-button" aria-label="Remove Skill" onClick={()=>handleDeleteSkill( index, skillIndex )}>
                                  <ClearIcon /> 
                                </IconButton>
                              </div>
                            );
                          } )
                        }
                      </div>
                    </div>
                  </div>
              ) }
              <Fab className="add-bullet-button" variant="extended" color="inherit" aria-label="Add" onClick={handleAddNewBulletPoint}>
                <AddIcon/> &nbsp;
                Add New Bullet Point
              </Fab>
            </div>
            {/**
            *   Action Buttons
            *   --------------
            */}
            <div className="action-button-container">
              <Fab className="check-button__no-margin" aria-label="Save" onClick={ _handleUpdateExperience } >
                  <CheckIcon/>
              </Fab>
              <Fab aria-label="Clear" onClick={handleResetExperience} >
                  <ClearIcon/>
              </Fab>
              <Fab color="secondary" aria-label="Delete" onClick={() => handleDeleteExperience(id) } >
                  <DeleteForeverIcon/>
              </Fab>
            </div>
        </div>: 
        /**
         * Non Edit Mode
         * -------------
         */
        <div className={ 'exp' + (editMode ? ' edit-outline':'')} onClick={()=>handleSelectExperience(id)}>
            <div className="line1">
                <div className="company">{company}</div> 
                <div className="date">{date.toUpperCase()}</div>
            </div>
            <h2>{position}</h2>
            {bulletPoints.map( ( point: BulletModel, 
              index: number ) => 
                <div key={index}>
                  <div key={index} className="bullet"><AddIcon className="bullet-icon"/> {point.point}</div>
                  <div className="nonedit-skill-list">
                    { point.skills.map( ( skillName: string, index: number ) => {  
                      const skillObject: SkillModel = skillsMapByName[skillName];
                      return (
                        <div className="nonedit-skill-item" key={index}>{ skillObject && skillObject.icon !== '' ? 
                          <FontAwesomeIcon className="small-skill-icon" icon={ brandIconSet[ `fa${skillObject.icon}` ]}/> : ''} 
                          &nbsp;{skillObject && skillObject.name}
                        </div>);
                    } ) }
                  </div>
                </div>
                 
              ) }
        </div>
        }
      </div>
    );
}

export default ExperienceComponent;