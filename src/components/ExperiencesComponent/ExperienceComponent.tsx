//React
import React, { useState, ChangeEvent } from 'react';

//Material UI
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TextField, Fab } from '@material-ui/core';

//Model
import ExperienceModel from '../../models/ExperienceModel';

//Style
import './ExperienceComponent.scss'

export interface ExperienceComponentProps extends ExperienceModel{
  editMode: boolean;
  handleDeleteExperience: Function;
  handleSelectExperience: Function;
  handleUpdateExperience: Function;
  selectedExperience: string;
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
    } = props;

    //localstate
    const [ companyEdit, handleEditCompany ] = useState( company );
    const [ dateEdit, handleEditDate ] = useState( date.toUpperCase() );
    const [ positionEdit, handleEditPosition ] = useState( position );
    const [ bulletPointsEdit, handleEditBulletPoints ] = useState( bulletPoints );

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
      newBulletPoints[ index ] = value;
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
            <TextField
                label="Edit Company"
                className="company-input company"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditCompany( event.target.value ) }
                value={companyEdit}
            /> 
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
          <TextField
              label="Edit Position"
              className="position-input fullwidth-input"
              InputLabelProps={{
                  shrink: true,
              }}
              onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditPosition( event.target.value ) }
              value={positionEdit}
          />
            <div className="bulletpoints-container">
              <label className="bulletpoints-label">Bullet Points</label>
              { bulletPointsEdit.map( 
                ( point: string, index: number ) => 
                  <TextField
                    key={index}
                    label={'Edit Point ' + (index+1)}
                    className="bullet-input fullwidth-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={ ( event: ChangeEvent<HTMLInputElement> ) => handleEditBulletPoint( index, event.target.value ) }
                    value={point}
                  />
              ) }
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
            {bulletPoints.map( ( point: string, 
              index: number ) => <div key={index} className="bullet"><AddIcon className="bullet-icon"/> {point}</div> ) }
        </div>
        }
      </div>
    );
}

export default ExperienceComponent;