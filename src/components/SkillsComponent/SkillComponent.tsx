//React
import React, { useState, ChangeEvent } from 'react';

//Material UI
import { 
  Fab,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Slider from '@material-ui/lab/Slider';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Model
import SkillModel from '../../models/SkillModel';

//Style
import './SkillComponent.scss';

export interface SkillProps extends SkillModel{
    editMode: boolean,
    handleDeleteSkill?: Function,
    handleUpdateSkill: Function, 
    newFlag?: boolean,
    onSelectSkill: Function,
    selectedSkill: string,
}

const SkillComponent = ( props: SkillProps )=> { 
    const { icon,
      editMode,
      handleDeleteSkill,
      handleUpdateSkill,
      id,
      interest,
      lastUsed,
      level,
      name,
      newFlag,
      onSelectSkill,
      selectedSkill,
    } = props;
    
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
    const handleResetSkill = ( event?: React.MouseEvent<HTMLElement> ):void => {
        event && event.stopPropagation();

        onSelectSkill( '' );
        handleEditName( name ); 
        handleEditLevel( level );     
        handleEditInterest( interest );     
        handleEditLastUsed( lastUsed );     
        handleEditIcon( icon ); 
    };



    /**
     * Update Skill handler gathering edited data for the handleUpdateSkill callback
     */
    const _handleUpdateSkill = ( event: React.MouseEvent<HTMLElement> ):void => { 
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
        <div className={'skill-container' + (editMode ? ' clickable' : '')} onClick={ ()=> editMode && onSelectSkill( selectedSkill !== id ? id : selectedSkill ) }>
            { newFlag ?
                <div className="add-button__container">
                    <AddIcon className="add-button"/>
                </div>:
                /**
                *   Static Preview of the skill
                *   ---------------------------
                */
                [ <div className="icon-container" key="iconContainer">
                    { icon !== '' ? <FontAwesomeIcon className="skill-icon" icon={ brandIconSet[ faIcon ]}/> : ''}
                </div>,
                <div key="skillContainer">
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
                    onChange={ (event:ChangeEvent<HTMLInputElement>)=>handleEditIcon(event.target.value) }
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
                    onChange={ (event:ChangeEvent<HTMLInputElement>)=>handleEditName(event.target.value) }
                    value={nameEdit}
                />
                {/**
                *   Skill Level Input
                *   -----------------
                */}
                <div className="skill-level-container">
                  <InputLabel className="skill-level-label" htmlFor="skill-level">Skill Level</InputLabel>
                  <div className="skill-level-value">{levelEdit}</div>
                  <Slider
                    id="skill-level"
                    value={levelEdit}
                    onChange={(event:ChangeEvent<{}>, value: number )=>handleEditLevel( Number(value))}
                    max={10}
                    min={0.5}
                    step={0.5}
                  />
                </div>
                {/**
                *   Interest Select
                *   ---------------
                */}
                <FormControl className="select-input">
                <InputLabel htmlFor="interest">Interest</InputLabel>
                <Select
                    value={ interestEdit }
                    onChange={(event:ChangeEvent<HTMLSelectElement>)=>handleEditInterest( event.target.value)}
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
                    onChange={(event:ChangeEvent<HTMLSelectElement>)=>handleEditLastUsed( event.target.value)}
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
                  <div className="action-button-container">
                  <Fab size="small" className="check-button action-buttons" aria-label="Edit" onClick={ _handleUpdateSkill } >
                      <CheckIcon/>
                  </Fab>
                  <Fab size="small" aria-label="Edit action-buttons" onClick={handleResetSkill} >
                      <ClearIcon/>
                  </Fab>
                  { 
                    newFlag ? undefined:
                    <Fab size="small" className="delete-button action-buttons" color="secondary" aria-label="Delete" onClick={() => handleDeleteSkill && handleDeleteSkill(id) } >
                      <DeleteForeverIcon/>
                    </Fab>                  
                  }
                </div>
            </span>:undefined }

        </div>:<div></div>
    );  
};

export default SkillComponent;