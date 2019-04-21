import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';
import './HeaderComponent.scss';

const HeaderComponent = () => { 
    const { state, dispatch, actions } = useContext(StoreContext);

    const handletoggleEditMode = ()=> { 
        dispatch( { 
            type: types.TOGGLE_EDIT,
            editMode: !state.editMode
        } );
    };

    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar className="toolbar">
                    <Typography variant="h6" color="inherit">
                        Resume                  
                    </Typography>
                    <div className="spacer" />
                    <Button variant="contained" color="primary" onClick={ handletoggleEditMode }>
                        { state.editMode ? 'Edit': 'View' }
                    </Button>  
                </Toolbar>
            </AppBar>            
        </div>
    );
};

export default HeaderComponent;