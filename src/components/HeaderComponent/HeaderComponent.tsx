//React
import React, { useContext, SyntheticEvent, useEffect, useState } from 'react';

//Context
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';

//Material
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExportIcon from '@material-ui/icons/ImportExport';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Component
import { ExportDialogComponent } from '../dialogs/ExportDialogComponent/ExportDialogComponent';

//Style
import './HeaderComponent.scss';

const HeaderComponent = () => { 
    const { state, dispatch, actions } = useContext(StoreContext);

    //local state
    const [ exportModalState, toggleExportModal ] = useState( false );
    
    /**
     * Toggle global export mode
     */
    const handletoggleEditMode = ():void => { 
        dispatch( { 
            type: types.TOGGLE_EDIT,
            editMode: !state.editMode
        } );
    };

    /**
     * Opening of the export dialog is handled as a local state
     * @param event Object
     */
    const handleExportDialogClose = ( event: SyntheticEvent ):void => { 
        toggleExportModal( false );
    }

    return (
        <div className="header-container" >
            <AppBar position="static" color="default">
                <Toolbar className="toolbar">
                    <Typography variant="h6" color="inherit">
                        One Resume
                    </Typography>
                    <div className="spacer" />

                    { 
                        /*  Export Data Button
                            ------------------*/
                    }
                    <Button variant="contained" onClick={ () => toggleExportModal( !exportModalState ) }>
                        <ExportIcon/> Export Data
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
            <ExportDialogComponent onClose={ handleExportDialogClose} openState={exportModalState} />
        </div>
    );
};

export default HeaderComponent;