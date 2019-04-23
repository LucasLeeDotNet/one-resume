import React, { useState, useEffect, SyntheticEvent } from 'react';
import SkillModel from '../../models/SkillModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import './SkillComponent.scss';
import { LinearProgress, TextField, FormControl, InputLabel, Select, MenuItem, Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

export interface SkillProps extends SkillModel{
    editMode: boolean,
    handleUpdateSkill: Function, 
    newFlag?: boolean,
    onSelectSkill: Function,
    selectedSkill: string,
}

const SkillComponent = ( props: SkillProps )=> { 
    const { icon, name, level, interest, lastUsed, id, handleUpdateSkill, selectedSkill, onSelectSkill, editMode, newFlag } = props;
    const [ nameEdit, handleEditName ] = useState( name );
    const [ levelEdit, handleEditLevel ] = useState( level );
    const [ interestEdit, handleEditInterest ] = useState( interest );
    const [ lastUsedEdit, handleEditLastUsed ] = useState( lastUsed );
    const [ iconEdit, handleEditIcon ] = useState( icon );

    //Reassigning the icon set to allow for dynamic input of icon names
    const brandIconSet:any = brandIcons;
    const faIcon = 'fa' + icon;
    


    /**
     * Reset the skill by loading in the local state with the props
     */
    const handleResetSkill = ( event?: SyntheticEvent ):void => {
        event && event.stopPropagation();

        onSelectSkill( '' );
        handleEditName( name ); 
        handleEditLevel( level );     
        handleEditInterest( interest );     
        handleEditLastUsed( lastUsed );     
        handleEditIcon( icon ); 
    };



    /**
     * Update Skill handler pass the edited data to the handler
     */
    const _handleUpdateSkill = ( event: SyntheticEvent ):void => { 
        event.stopPropagation();
        editMode && handleUpdateSkill( { 
            id,
            icon: iconEdit, 
            name: nameEdit, 
            level: Number(levelEdit), 
            interest: interestEdit, 
            lastUsed: lastUsedEdit
        } );
        newFlag && handleResetSkill();
    };

    return ( 
        ( !newFlag || newFlag && editMode ) ? 
        <div className="skill-container" onClick={ ()=> editMode && onSelectSkill( selectedSkill !== id ? id : selectedSkill ) }>
            { newFlag ?
                <div className="add-button__container">
                    <AddIcon className="add-button"/>
                </div>:
                /**
                *   Static Preview of the skill
                *   ---------------------------
                */
                [ <div className="icon-container">
                    <FontAwesomeIcon className="skill-icon" icon={ brandIconSet[ faIcon ]}/>
                </div>,
                <div>
                    <div className="skill-name">{name}</div>
                    <div className="skill-progress-container">
                        <div className="skill-row"> <span className="skill-label">Skill </span> <div className="spacer"/>{level}/10 </div>
                        <LinearProgress variant="determinate" value={level/10*100} />
                        <div className="skill-row"> <span className="skill-label">Interest </span> <div className="spacer"/> {interest}</div>
                        <div className="skill-row"> <span className="skill-label">Last used </span> <div className="spacer"/> {lastUsed}</div>

                    </div>
                </div>]
            }
            { selectedSkill === id ? 
            <span className="input-container">
                {/**
                *  Icon Input
                *   ---------
                */}
                <TextField
                    label="Edit Skill Icon"
                    className="text-input text-input--small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={ (event:any)=>handleEditIcon(event.target.value) }
                    value={iconEdit}
                />
                {/**
                *   Skill Name Input
                *   ----------------
                */}
                <TextField
                    label="Edit Skill Name"
                    className="text-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={ (event:any)=>handleEditName(event.target.value) }
                    value={nameEdit}
                />
                {/**
                *   Skill Level Input
                *   -----------------
                */}
                <TextField
                    label="Edit Skill Level"
                    className="text-input text-input--small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={ (event:any)=>handleEditLevel(event.target.value) }
                    value={levelEdit}
                />
                {/**
                *   Interest Select
                *   ---------------
                */}
                <FormControl className="select-input">
                <InputLabel htmlFor="interest">Interest</InputLabel>
                <Select
                    value={ interestEdit }
                    onChange={(event:any)=>handleEditInterest( event.target.value)}
                    inputProps={{
                    name: 'interest',
                    id: 'interest',
                    }}
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Moderate">Moderate</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Highest">Highest</MenuItem>
                </Select>
                </FormControl>
                {/**
                *   Last Used Select
                *   ----------------
                */}
                <FormControl className="select-input">
                <InputLabel htmlFor="lastUsed">Last Used</InputLabel>
                <Select
                    value={ lastUsedEdit }
                    onChange={(event:any)=>handleEditLastUsed( event.target.value)}
                    inputProps={{
                    name: 'lastUsed',
                    id: 'lastUsed',
                    }}
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value="Current">Current</MenuItem>
                    <MenuItem value="This Month">This Month</MenuItem>
                    <MenuItem value="Last Month">Last Month</MenuItem>
                    <MenuItem value="This Year">This Year</MenuItem>
                    <MenuItem value="Before This Year">Before This Year</MenuItem>
                </Select>
                </FormControl>
                {/**
                *   Action Buttons
                *   --------------
                */}
                <Fab className="check-button" aria-label="Edit" onClick={ _handleUpdateSkill } >
                    <CheckIcon/>
                </Fab>
                <Fab aria-label="Edit" onClick={handleResetSkill} >
                    <ClearIcon/>
                </Fab>
            </span>:undefined }

        </div>:<div></div>
    );  
};

export default SkillComponent;