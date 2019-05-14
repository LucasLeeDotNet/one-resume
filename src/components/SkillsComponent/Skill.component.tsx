// React
import React, { ChangeEvent, MouseEvent, useState } from "react";

// Material UI
import {
  Fab,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Tooltip,
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
    onDeleteSkill?: (id: string) => void;
    onUpdateSkill: ( skill: SkillModel ) => void;
    newFlag?: boolean;
    onSelectSkill: ( id: string ) => void;
    selectedSkill: string;
}

const SkillComponent = ( props: ISkillProps ) => {
    const { icon,
      editMode,
      onDeleteSkill,
      onUpdateSkill,
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


    /**
     * Generate the list of options for the skill icon select
     *
     * @returns {JSX.Element[]}
     */
    const generateIconOptions = ( ): JSX.Element[] => {
      const generateItem = ( skillIcon: string, index: number ) => {
        const iconName = skillIcon.replace( /^fa/, "" );
        return (
          <MenuItem key={index} value={iconName}>
            { skillIcon !== "" ?
              <FontAwesomeIcon className="small-skill-icon" icon={brandIconSet[ `${skillIcon}` ]}/>
              :
              ""
            } &nbsp;&nbsp;{iconName}
          </MenuItem>
        );
      };

      const removeFabAndPrefix = (key: string) => key !== "fab" && key !== "prefix";
      return Object.keys(brandIconSet).filter( removeFabAndPrefix ).map( generateItem );
    };


    /**
     * Return Skillmodel from the editable inputs
     *
     * @returns {SkillModel}
     */
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
     * Enters edit mode after selecting a skill
     *
     * @returns {void}
     */
    const handleSelectSkill = ( event: MouseEvent<HTMLElement> ): void => {
      if ( editMode && typeof id === "string" && selectedSkill !== id ) {
        // event.currentTarget.scrollIntoView();
        onSelectSkill( id );
      }
    };


    const handleDeleteSkill = () => {
      if ( onDeleteSkill && typeof id === "string" ) { onDeleteSkill(id); }
    };


    const handleInterestLevelChange = (event: ChangeEvent<HTMLSelectElement>): void => {
      handleEditInterest( event.target.value);
    };


    const handleLastUsedSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
      handleEditLastUsed( event.target.value);
    };


    /**
     * Update Skill handler gathering edited data for the handleUpdateSkill callbac
     *
     * @param {React.MouseEvent<HTMLElement>} event Mouse click event
     * @returns {void}
     */
    const handleUpdateSkillClicked = ( event: React.MouseEvent<HTMLElement> ): void => {
        event.stopPropagation();
        if ( editMode ) { onUpdateSkill( getAllEdits() ); }
        if ( newFlag ) { handleResetSkill(); }
    }  ;


    /**
     * Reset the skill by reverting to the original props
     *
     * @param {React.MouseEvent<HTMLElement>} event Mouse click event
     * @returns {void}
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


    const handleSkillIconSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
      handleEditIcon(event.target.value);
    };

    const handleSkillLevelSliderChange = (event: ChangeEvent<{}>, value: number ): void => {
      handleEditLevel( Number(value) );
    };

    const handleSkillNameTextInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
      handleEditName(event.target.value);
    };


    /**
     * Renders the interest level selector
     *
     * @returns {JSX.Element}
     */
    const renderInterestLevelSelect = (): JSX.Element => (
      <FormControl className="select-input">
      <InputLabel htmlFor="interest">Interest</InputLabel>
      <Select
        value={interestEdit}
        onChange={handleInterestLevelChange}
        inputProps={{
          id: "interest",
        name: "interest",
        }}
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Moderate">Moderate</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Highest">Highest</MenuItem>
      </Select>
      </FormControl>
    );


    /**
     * Renders the last used selector
     *
     * @returns {JSX.Element}
     */
    const renderLastUsedSelect = (): JSX.Element => (
      <FormControl className="select-input">
      <InputLabel htmlFor="lastUsed">Last Used</InputLabel>
      <Select
        value={lastUsedEdit}
        onChange={handleLastUsedSelectChange}
        inputProps={{
          id: "lastUsed",
        name: "lastUsed",
        }}
      >
        <MenuItem value="Current">Current</MenuItem>
        <MenuItem value="This Month">This Month</MenuItem>
        <MenuItem value="Last Month">Last Month</MenuItem>
        <MenuItem value="This Year">This Year</MenuItem>
        <MenuItem value="Before This Year">Before This Year</MenuItem>
      </Select>
      </FormControl>
    );


    /**
     * Renders the skill icon selector
     *
     * @returns {JSX.Element}
     */
    const renderSkillIconSelect = (): JSX.Element => (
      <FormControl className="select-input" >
        <InputLabel htmlFor="skill-icon">Select Skills</InputLabel>
        <Select
          id="skill-icon"
          value={iconEdit}
          onChange={handleSkillIconSelectChange}
        >
          {generateIconOptions()}
        </Select>
      </FormControl>
    );


    /**
     * Renders the skill level text input
     *
     * @returns {JSX.Element}
     */
    const renderSkillLevelSlider = (): JSX.Element => (
      <div className="skill-level-container">
      <InputLabel className="skill-level-label" htmlFor="skill-level">Skill Level</InputLabel>
      <div className="skill-level-value">{levelEdit}</div>
      <Slider
        id="skill-level"
        value={levelEdit}
        onChange={handleSkillLevelSliderChange}
        max={10}
        min={0.5}
        step={0.5}
      />
      </div>
    );


    /**
     * Renders the skill name text input
     *
     * @returns {JSX.Element}
     */
    const renderSkillNameTextInput = (): JSX.Element => (
      <TextField
        label="Edit Skill Name"
        className="text-input"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleSkillNameTextInputChange}
        value={nameEdit}
      />
    );


    /**
     * Renders the static skill preview
     *
     * @returns {JSX.Element[]}
     */
    const renderStaticSkillPreivew = (): JSX.Element[] => {
      return [
        (
          <div className="icon-container" key="iconContainer">
            { icon !== "" && typeof brandIconSet[ faIcon ] !== "undefined" ?
              <FontAwesomeIcon className="skill-icon" icon={brandIconSet[ faIcon ]}/>
              :
              undefined
            }
        </div>
        ),
        (
          <div className="skill-info-container" key="skillContainer">
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
                <div className="last-used-value">{lastUsed}</div>
              </div>
            </div>
          </div>
        ),
      ];
    };


    return (
      ( !newFlag || newFlag && editMode ) ?
        (
          <div
            className={"skill-container" +
            ( editMode ? " clickable" : "" ) +
            ( selectedSkill === id ? " selected-skill" : "" )}
            onClick={handleSelectSkill}
          >

          { newFlag ?
            <div className="add-button__container">
              <AddIcon className="add-button"/>
              <div className="new-skill-label">
                Add New Skill
              </div>
            </div> :
            renderStaticSkillPreivew()
          }

          { selectedSkill === id ?
            <span className="input-container">
              {renderSkillIconSelect()}
              {renderSkillNameTextInput()}
              {renderSkillLevelSlider()}
              {renderInterestLevelSelect()}
              {renderLastUsedSelect()}


              {
                /**
                 * Action Buttons
                 * --------------
                 */
              }
              <div className="action-button-container">
                <Tooltip title="Save">
                  <Fab
                      aria-label="Save"
                      className="check-button action-button"
                      onClick={handleUpdateSkillClicked}
                      size="small"
                  >
                    <CheckIcon/>
                  </Fab>
                </Tooltip>

                <Tooltip title="Cancel">
                  <Fab size="small" aria-label="Cancel" className="action-button" onClick={handleResetSkill} >
                    <ClearIcon/>
                  </Fab>
                </Tooltip>

                {
                  newFlag ?
                    undefined
                    :
                    <Tooltip title="Delete">
                      <Fab
                        size="small"
                        className="delete-button action-button"
                        color="secondary"
                        aria-label="Delete"
                        onClick={handleDeleteSkill}
                      >
                        <DeleteForeverIcon/>
                      </Fab>
                    </Tooltip>
                }
              </div>
            </span>
            :
            undefined
          }
          </div>
        )
        :
        <div/>
    );
};

export default SkillComponent;
