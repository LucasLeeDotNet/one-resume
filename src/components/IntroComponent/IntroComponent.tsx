import React, { useState, useContext, useEffect } from 'react';
import './IntroComponent.scss';
import { Fab, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { types } from '../../context/reducers';
import { StoreContext } from '../../context/StoreContext';
import IntroModel from '../../models/IntroModel';

export interface IntroComponentProps {
    name: string;
    position: string;
    statement: string;
}

const IntroComponent = ( props: IntroComponentProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const intro: IntroModel = state.intro;
    const editMode: boolean = state.editMode;
    
    const { name, position, statement } = props;

    useEffect( ()=>{ 
        if ( !editMode ){ 
            toggleStatementEditMode( false );
            togglePositionEditMode( false );
        }
    });
    //localstate
    const [ statementEditMode, toggleStatementEditMode ] = useState( false );
    const [ positionEditMode, togglePositionEditMode ] = useState( false );

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
    return ( 
        <div className="intro">
            <h1>{name}</h1>
            <div className={'position' + (positionEditMode && editMode ? ' extra-margin': '')}>
                { 
                    //Edit Icon
                    positionEditMode && editMode?
                    <Fab className="edit-icon" color="secondary" aria-label="Edit" onClick={ ()=> togglePositionEditMode( !positionEditMode )} >
                        <CheckIcon/>
                    </Fab>:undefined
                }
                { positionEditMode && editMode ? 
                    <div>
                        <TextField
                            label="Edit Position"
                            className="position-input"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={ handlePositionChange }
                            value={intro.position}
                        />
                    </div>: 
                    <div onClick={ ()=> editMode && togglePositionEditMode( !positionEditMode )}>
                        {intro.position}
                    </div>
                }
            </div>
            <div className={'statement' + (statementEditMode && editMode ? ' extra-margin': '')}>
                { 
                    statementEditMode && editMode ?
                    <Fab className="edit-icon" aria-label="Edit" onClick={ ()=> toggleStatementEditMode( !statementEditMode )} >
                        <CheckIcon/>
                    </Fab>:undefined
                }
                { statementEditMode && editMode ? 
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
                    <div onClick={ ()=> editMode && toggleStatementEditMode( !statementEditMode )}>
                        {intro.statement}
                    </div>
                }
       
            </div>
        </div>
    );
}

export default IntroComponent;