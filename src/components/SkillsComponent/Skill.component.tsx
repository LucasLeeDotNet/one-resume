// React
import React, { ChangeEvent, useState } from "react";

// Material UI
import {
  Fab,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";

// Material UI
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// FontAwesome
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Model
import SkillModel from "../../models/SkillModel";

// Style
import "./Skill.style.scss";

export interface ISkillProps extends SkillModel {
    editMode: boolean;
    handleDeleteSkill?: Function;
    handleUpdateSkill: Function;
    newFlag?: boolean;
    onSelectSkill: Function;
    selectedSkill: string;
}

const SkillComponent = ( props: ISkillProps ) => {
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

    // Reassigning the icon set to allow for dynamic input of icon names
    const brandIconSet: any = brandIcons;
    const faIcon = "fa" + icon;


    const generateIconOptions = ( ) => {
      const generateItem = ( skillIcon: string ) => {
        const iconName = skillIcon.replace( /^fa/, "" );
        return (
          <MenuItem value={iconName}>
            { skillIcon !== "" ?
              <FontAwesomeIcon className="small-skill-icon" icon={brandIconSet[ `${skillIcon}` ]}/>
              :
              ""
            } &nbsp;&nbsp;{iconName}
          </MenuItem>
        );
      };

      return Object.keys(brandIconSet).filter( (key) => key !== "fab" && key !== "prefix" ).map( generateItem );
    };

    const getAllEdits = (): SkillModel => {
      return {
          icon: iconEdit,
          id,
          interest: interestEdit,
          lastUsed: lastUsedEdit,
          level: Number(levelEdit),
          name: nameEdit,
      };
    };


    /**
     * Reset the skill by loading in the local state with the props
     */
    const handleResetSkill = ( event?: React.MouseEvent<HTMLElement> ): void => {
        if ( event ) { event.stopPropagation(); }

        onSelectSkill( "" );
        handleEditName( name );
        handleEditLevel( level );
        handleEditInterest( interest );
        handleEditLastUsed( lastUsed );
        handleEditIcon( icon );
    };


    /**
     * Update Skill handler gathering edited data for the handleUpdateSkill callback
     */
    const handleUpdateSkillClicked = ( event: React.MouseEvent<HTMLElement> ): void => {
        event.stopPropagation();
        if ( editMode ) { handleUpdateSkill( getAllEdits() ); }
        if ( newFlag ) { handleResetSkill(); }
    };

    return (
        ( !newFlag || newFlag && editMode ) ?
        (
            <div className={"skill-container" + (editMode ? " clickable" : "")} onClick={() => editMode && onSelectSkill( selectedSkill !== id ? id : selectedSkill )}>
                { newFlag ?
                    <div className="add-button__container">
                        <AddIcon className="add-button"/>
                    </div> :


                    /**
                     * Static Preview of the skill
                     * ---------------------------
                     */
                    [ <div className="icon-container" key="iconContainer">
                        {icon !== "" && typeof brandIconSet[ faIcon ] !== "undefined" ?
                          <FontAwesomeIcon className="skill-icon" icon={brandIconSet[ faIcon ]}/>
                          :
                          ""
                        }
                    </div>,
                    <div key="skillContainer">
                        <div className="skill-name">{name}</div>
                        <div className="skill-progress-container">
                            <div className="skill-row">
                              <span className="skill-label">Skill </span>
                              <div className="spacer"/>
                              {level}/10
                            </div>
                            <LinearProgress variant="determinate" value={level / 10 * 100} />
                            <div className="skill-row">
                              <span className="skill-label">Interest </span>
                              <div className="spacer"/>
                              {interest}
                            </div>
                            <div className="skill-row">
                              <span className="skill-label">Last used </span>
                              <div className="spacer"/>
                              {lastUsed}
                            </div>

                        </div>
                    </div>]
                }


                { selectedSkill === id ?
                <span className="input-container">


                  { 
                    /**
                     * Icon Select for the skill
                     * -------------------------
                     */
                  }
                  <FormControl className="select-input" >
                    <InputLabel htmlFor="skill-icon">Select Skills</InputLabel>
                    <Select
                      id="skill-icon"
                      value={iconEdit}
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => handleEditIcon(event.target.value)}
                    >
                      {generateIconOptions()}
                    </Select>
                  </FormControl>


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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleEditName(event.target.value)}
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
                        onChange={(event: ChangeEvent<{}>, value: number ) => handleEditLevel( Number(value))}
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
                        value={interestEdit}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => handleEditInterest( event.target.value)}
                        inputProps={{
                        name: "interest",
                        id: "interest",
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
                        value={lastUsedEdit}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => handleEditLastUsed( event.target.value)}
                        inputProps={{
                        name: "lastUsed",
                        id: "lastUsed",
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
                    <Fab
                        aria-label="Edit"
                        className="check-button action-buttons"
                        onClick={handleUpdateSkillClicked}
                        size="small"
                    >
                        <CheckIcon/>
                    </Fab>
                    <Fab size="small" aria-label="Edit action-buttons" onClick={handleResetSkill} >
                        <ClearIcon/>
                    </Fab>
                    {
                        newFlag ? undefined :
                        <Fab size="small" className="delete-button action-buttons" color="secondary" aria-label="Delete" onClick={() => handleDeleteSkill && handleDeleteSkill(id)} >
                        <DeleteForeverIcon/>
                        </Fab>
                    }
                    </div>
                </span> : undefined }

            </div>
        )
        :
        <div/>
    );
};

export default SkillComponent;
