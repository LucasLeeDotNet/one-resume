import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
                        One Resume                  
                    </Typography>
                    <div className="spacer" />
                    { 
                        /*  Mode Button
                            -----------*/
                    }
                    <Button variant="contained" onClick={ handletoggleEditMode }>
                        { state.editMode ? ['Edit Mode ',<EditIcon className="mode-icon"/>] : ['View Mode', <VisibilityIcon className="mode-icon"/>] } 
                    </Button>  
                </Toolbar>
            </AppBar>            
        </div>
    );
};

export default HeaderComponent;