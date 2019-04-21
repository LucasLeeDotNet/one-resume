import React, { useState, useContext } from 'react';
import './IntroComponent.scss';
import { Fab, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { types } from '../../context/reducers';
import { StoreContext } from '../../context/StoreContext';

export interface IntroComponentProps {
    name: string;
    position: string;
    statement: string;
}

const IntroComponent = ( props: IntroComponentProps )=> { 
    const { state, dispatch, actions } = useContext(StoreContext);

    const { name, position, statement } = props;
    const [ statementEditMode, toggleStatementEditMode ] = useState( false );

    const handleStatementChange = ( event:any ) => { 
        console.log( event.target.value );
        dispatch( 
            { 
                type: types.UPDATE_STATEMENT,
                statement: event.target.value
            }
        );
    }
    return ( 
        <div className="intro">
            <h1>{name}</h1>
            <p className="position">{position}</p>
            <p className="statement">
                { statementEditMode ? 
                    <TextField
                        id="outlined-full-width"
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
                        value={state.intro.statement}
                    />: 
                    state.intro.statement
                }
                { 
                    state.editMode?
                    <Fab className="edit-icon" color="secondary" aria-label="Edit" onClick={ ()=> toggleStatementEditMode( !statementEditMode )} >
                        <EditIcon/>
                    </Fab>:undefined
                }
       
            </p>
        </div>
    );
}

export default IntroComponent;