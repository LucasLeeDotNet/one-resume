import React, { useContext, SyntheticEvent, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';
import EditIcon from '@material-ui/icons/Edit';
import ExportIcon from '@material-ui/icons/ImportExport';
import VisibilityIcon from '@material-ui/icons/Visibility';
import './HeaderComponent.scss';
import { ExportDialogComponent } from '../dialogs/ExportDialogComponent/ExportDialogComponent';

const HeaderComponent = () => { 
    const { state, dispatch, actions } = useContext(StoreContext);
    const [ exportModalState, toggleExportModal ] = useState( false );
    let manifest;
    useEffect( ()=> {  
        manifest = { 
            experinces: state.experinces,
            intro: state.intro,
            skills: state.skills, 
        };
    } )

    const handletoggleEditMode = () => { 
        dispatch( { 
            type: types.TOGGLE_EDIT,
            editMode: !state.editMode
        } );
    };

    const handleExportDialogClose = ( event: SyntheticEvent ) => { 
        toggleExportModal( false );
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar className="toolbar">
                    <Typography variant="h6" color="inherit">
                        One Resume
                    </Typography>
                    <div className="spacer" />

                    <Button variant="contained" onClick={ () => toggleExportModal( !exportModalState ) }>
                        <ExportIcon/> Export
                    </Button>

                    { 
                        /*  Mode Button
                            -----------*/
                    }
                    <Button className="right-menu-button" variant="contained" onClick={ handletoggleEditMode }>
                        { state.editMode ? ['Edit Mode ',<EditIcon className="mode-icon"/>] : ['View Mode', <VisibilityIcon className="mode-icon"/>] } 
                    </Button>  
                </Toolbar>
            </AppBar>
            <ExportDialogComponent onClose={ handleExportDialogClose} manifest={manifest} openState={exportModalState} />
        </div>
    );
};

export default HeaderComponent;