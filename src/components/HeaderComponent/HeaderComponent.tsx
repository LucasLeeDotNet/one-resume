//React
import React, { useContext, SyntheticEvent, useEffect, useState } from 'react';

//Context
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';

//Material
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExportIcon from '@material-ui/icons/ImportExport';
import PrintIcon from '@material-ui/icons/Print';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DescriptionIcon from '@material-ui/icons/Description';

//Component
import { ExportDialogComponent } from '../dialogs/ExportDialogComponent/ExportDialogComponent';

//Style
import './HeaderComponent.scss';


const HeaderComponent = () => { 
    const { state, dispatch, actions } = useContext(StoreContext);

    //local state
    const [ exportModalState, toggleExportModal ] = useState( false );

    /**
     * Opening of the export dialog is handled as a local state
     * @param event Object
     */
    const handleExportDialogClose = ( event: SyntheticEvent ):void => { 
      toggleExportModal( false );
  }

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
     * Remove toolbar for print out
     */
    const handlePrintModeClick = () => { 
      actions.handlePrintModeToggle( true );
    }

    return (
        state.printMode ? <div></div>:
        <div className="header-container" >
            <AppBar position="static" color="default">
                <Toolbar className="toolbar">
                    <Typography variant="h6" color="inherit">
                        Resume
                    </Typography>
                    <div className="spacer" />

                    {/* <Button variant="contained" onClick={ handlePrintModeClick }>
                        <PrintIcon/> Hide Toolbar for Print
                    </Button> */}

                    { 
                        /*  Generate PDF Button
                            ------------------*/
                    }
                    {/* <Button className="right-menu-button"variant="contained" onClick={ actions.handlePrintPdf }>
                        <DescriptionIcon/> Generate PDF (Has Issues)
                    </Button> */}


                    { 
                        /*  Export Data Button
                            ------------------*/
                    }
                    <Button className="right-menu-button" variant="contained" onClick={ () => toggleExportModal( !exportModalState ) }>
                        <ExportIcon/> Export Data
                    </Button>

                    { 
                        /*  Mode Button
                            -----------*/
                    }
                    <Button className="right-menu-button" variant="contained" onClick={ handletoggleEditMode }>
                        { state.editMode ? ['Edit Mode ',<EditIcon key="editMode" className="mode-icon"/>] : ['View Mode', <VisibilityIcon key="visibilityIcon" className="mode-icon"/>] } 
                    </Button>  
                </Toolbar>
            </AppBar>
            <ExportDialogComponent onClose={ handleExportDialogClose} openState={exportModalState} />
        </div>
    );
};

export default HeaderComponent;