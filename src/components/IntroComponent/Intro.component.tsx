// React
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

// Context
import { types } from "../../context/reducers";
import { StoreContext } from "../../context/StoreContext";

// Material UI
import { Fab, TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// Model
import IntroModel from "../../models/IntroModel";

// Style
import "./Intro.component.scss";

export interface IIntroComponentProps {}

const IntroComponent = ( props: IIntroComponentProps ) => {
    const { state, dispatch, actions } = useContext(StoreContext);
    const { position, name, statement }: IntroModel = state.intro;
    const editMode: boolean = state.editMode;


    /**
     * If editMode is off, ensure local edit state are turned off
     */
    useEffect( () => {
        if ( !editMode ) {
            toggleStatementEditMode( false );
            togglePositionEditMode( false );
            toggleNameEditMode( false );
        }
    });


    // local state
    const [ statementEditMode, toggleStatementEditMode ] = useState( false );
    const [ positionEditMode, togglePositionEditMode ] = useState( false );
    const [ nameEditMode, toggleNameEditMode ] = useState( false );


    /**
     * Statement Input Update
     * 
     * @param {ChangeEvent<HTMLInputElement>} event 
     */
    const handleStatementChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        dispatch(
            {
                type: types.UPDATE_STATEMENT,
                statement: event.target.value,
            },
        );
    };


    /**
     * Position Input Update
     * 
     * @param {ChangeEvent<HTMLInputElement>} event
     */
    const handlePositionChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        dispatch(
            {
              position: event.target.value,
              type: types.UPDATE_POSITION,
            },
        );
    };

    const handleNameChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        dispatch(
            {
              name: event.target.value,
              type: types.UPDATE_NAME,
            },
        );
    };

    return (
        <div className="intro">
            {/* Name
                --------
            */}
            <div className={"name" + (nameEditMode && editMode ? " extra-margin" : "") + (editMode && !nameEditMode ? " edit-outline" : "")}>
                {
                    /*  Check Button
                        ------------
                    */
                    nameEditMode && editMode ?
                    <Fab className="edit-icon" color="secondary" aria-label="Edit" onClick={() => toggleNameEditMode( false )} >
                        <CheckIcon/>
                    </Fab> : undefined
                }
                { nameEditMode && editMode ?
                    /*  Name Input
                        ---------------
                    */
                    <TextField
                        label="Edit Name"
                        className="name-input"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleNameChange}
                        value={name}
                    /> :
                    /*  Name View Mode
                        ------------------
                    */
                    <div onClick={() => editMode && toggleNameEditMode( !nameEditMode )}>
                        <h1 className="name">{name}</h1>
                    </div>
                }
            </div>
            {/* Position
                --------
            */}
            <div className={"position" + (positionEditMode && editMode ? " extra-margin" : "") + (editMode && !positionEditMode ? " edit-outline" : "")}>
                {
                    /*  Check Button
                        ------------
                    */
                    positionEditMode && editMode ?
                    <Fab className="edit-icon" color="secondary" aria-label="Edit" onClick={() => togglePositionEditMode( false )} >
                        <CheckIcon/>
                    </Fab> : undefined
                }
                { positionEditMode && editMode ?
                    /*  Position Input
                        ---------------
                    */
                    <TextField
                        label="Edit Position"
                        className="position-input"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handlePositionChange}
                        value={position}
                    /> :
                    /*  Position View Mode
                        ------------------
                    */
                    <div onClick={() => editMode && togglePositionEditMode( !positionEditMode )}>
                        {position}
                    </div>
                }
            </div>
            {/* Statement
                --------
            */}
            <div className={"statement" + (statementEditMode && editMode ? " extra-margin" : "") + (editMode && !statementEditMode ? " edit-outline" : "")}>
                {
                    /*  Check Button
                        ------------
                    */
                    statementEditMode && editMode ?
                    <Fab className="edit-icon" aria-label="Edit" onClick={() => toggleStatementEditMode( false )} >
                        <CheckIcon/>
                    </Fab> : undefined
                }
                { statementEditMode && editMode ?
                    /*  Statement Input
                        ---------------
                    */
                    <TextField
                        label="Edit Statement"
                        fullWidth={true}
                        multiline={true}
                        className="statement-input"
                        margin="normal"
                        style={{ margin: 8 }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleStatementChange}
                        value={statement}
                    /> :
                    /*  Statement View Mode
                        -------------------
                    */
                    <div onClick={() => editMode && toggleStatementEditMode( !statementEditMode )}>
                        {statement}
                    </div>
                }
            </div>
        </div>
    );
};

export default IntroComponent;
