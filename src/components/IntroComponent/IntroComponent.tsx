import React, { useState, useContext, useEffect } from 'react';
import './IntroComponent.scss';
import { Fab, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { types } from '../../context/reducers';
import { StoreContext } from '../../context/StoreContext';
import IntroModel from '../../models/IntroModel';

export interface IntroComponentProps {}

const IntroComponent = ( props: IntroComponentProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const intro: IntroModel = state.intro;
    const editMode: boolean = state.editMode;
    
    //Being Stubborn and wanted to included some local state rather than just having the toggles in the global state.
    useEffect( ()=>{ 
        if ( !editMode ){ 
            toggleStatementEditMode( false );
            togglePositionEditMode( false );
            toggleNameEditMode( false );
        }
    });
    
    //localstate
    const [ statementEditMode, toggleStatementEditMode ] = useState( false );
    const [ positionEditMode, togglePositionEditMode ] = useState( false );
    const [ nameEditMode, toggleNameEditMode ] = useState( false );
    
    //Simple update handlers
    const handleStatementChange = ( event:any ) => { 
        dispatch( 
            { 
                type: types.UPDATE_STATEMENT,
                statement: event.target.value
            }
        );
    };

    const handlePositionChange = ( event:any ) => { 
        dispatch( 
            { 
                type: types.UPDATE_POSITION,
                statement: event.target.value
            }
        );
    }

    const handleNameChange = ( event:any ) => { 
        dispatch( 
            { 
                type: types.UPDATE_NAME,
                statement: event.target.value
            }
        );
    }

    return ( 
        <div className="intro">
            {/* Name 
                --------
            */}
            <div className={'name' + (nameEditMode && editMode ? ' extra-margin': '') + (editMode && !nameEditMode ? ' edit-outline':'')}>
                { 
                    /*  Check Button
                        ------------
                    */
                    nameEditMode && editMode?
                    <Fab className="edit-icon" color="secondary" aria-label="Edit" onClick={ ()=> toggleNameEditMode( !nameEditMode )} >
                        <CheckIcon/>
                    </Fab>:undefined
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
                        onChange={ handleNameChange }
                        value={intro.name}
                    />: 
                    /*  Name View Mode
                        ------------------
                    */  
                    <div onClick={ ()=> editMode && toggleNameEditMode( !nameEditMode )}>
                        <h1 className="name">{intro.name}</h1>
                    </div>
                }
            </div>            
            {/* Position 
                --------
            */}
            <div className={'position' + (positionEditMode && editMode ? ' extra-margin': '') + (editMode && !positionEditMode ? ' edit-outline':'')}>
                { 
                    /*  Check Button
                        ------------
                    */
                    positionEditMode && editMode?
                    <Fab className="edit-icon" color="secondary" aria-label="Edit" onClick={ ()=> togglePositionEditMode( !positionEditMode )} >
                        <CheckIcon/>
                    </Fab>:undefined
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
                        onChange={ handlePositionChange }
                        value={intro.position}
                    />: 
                    /*  Position View Mode
                        ------------------
                    */  
                    <div onClick={ ()=> editMode && togglePositionEditMode( !positionEditMode )}>
                        {intro.position}
                    </div>
                }
            </div>
            {/* Statement 
                --------
            */}
            <div className={'statement' + (statementEditMode && editMode ? ' extra-margin': '') + (editMode && !statementEditMode ? ' edit-outline':'')}>
                { 
                    /*  Check Button
                        ------------
                    */
                    statementEditMode && editMode ?
                    <Fab className="edit-icon" aria-label="Edit" onClick={ ()=> toggleStatementEditMode( !statementEditMode )} >
                        <CheckIcon/>
                    </Fab>:undefined
                }
                { statementEditMode && editMode ? 
                    /*  Statement Input
                        ---------------
                    */
                    <TextField
                        label="Edit Statement"
                        fullWidth
                        multiline
                        className="statement-input"
                        margin="normal"
                        style={{ margin: 8 }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={ handleStatementChange }
                        value={intro.statement}
                    />: 
                    /*  Statement View Mode
                        -------------------
                    */
                    <div onClick={ ()=> editMode && toggleStatementEditMode( !statementEditMode )}>
                        {intro.statement}
                    </div>
                }
            </div>
        </div>
    );
}

export default IntroComponent;